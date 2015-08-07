// DISKS STORE
// ===========
// Store information about the physical storage devices connected to the FreeNAS
// server, their S.M.A.R.T. status (if available), but not the activity level or
// other highly specific information about the individual components.

"use strict";

import _ from "lodash";

import DebugLogger from "../../utility/DebugLogger";
import ByteCalc from "../../utility/ByteCalc";

import FreeNASDispatcher from "../dispatcher/FreeNASDispatcher";
import { ActionTypes } from "../constants/FreeNASConstants";
import FluxBase from "./FLUX_STORE_BASE_CLASS";

const DL = new DebugLogger( "DISKS_STORE_DEBUG" );

const DISK_LABELS =
  { serial: "Serial"
  , humanSize: "Capacity"
  , online: "Disk Online"
  , path: "Path"
  , sectorsize: "Sector Size"
  , "max-rotation": "Maximum RPM"
  , "smart-enabled": "S.M.A.R.T. Enabled"
  , "smart-status": "S.M.A.R.T. Status"
  , model: "Disk Model"
  , schema: "Partition Format"
  };

var _disks = {};

class DisksStore extends FluxBase {

  constructor () {
    super();

    this.dispatchToken = FreeNASDispatcher.register(
      handlePayload.bind( this )
    );

    this.KEY_UNIQUE = "serial";
    this.ITEM_LABELS = DISK_LABELS;
  }

  get disksArray () {
    return (
      _.chain( _disks )
       .values()
       .sortBy( "path" )
       .value()
    );
  }

  getByPath ( path ) {
    if ( _.isArray( path ) ) {
      let collection = [];

      for ( let i = 0; i < path.length; i++ ) {
        let workingDisk = _.findWhere( _disks, { path: path[i] } );
        if ( workingDisk ) {
          collection.push( workingDisk );
        }
      }

      return collection;
    } else {
      return _.findWhere( _disks, { path: path } );
    }
  }

  getBiggestDisk ( path ) {
    if ( this.isInitialized ) {
      return _.chain( this.getByPath( path ) )
              .sortBy( "mediasize" )
              .last()
              .value();
    } else {
      if ( DL.reports( "stores" ) ) {
        DL.warn( "Cannot call method 'getBiggestDisk': DisksStore not "
               + "initialized"
               );
      }
      return null;
    }
  }

  getSmallestDisk ( path ) {
    if ( this.isInitialized ) {
      return _.chain( this.getByPath( path ) )
              .sortBy( "mediasize" )
              .first()
              .value();
    } else {
      if ( DL.reports( "stores" ) ) {
        DL.warn( "Cannot call method 'getSmallestDisk': DisksStore not "
               + "initialized"
               );
      }
      return null;
    }
  }

}

function getCalculatedDiskProps ( disk ) {
  let calculatedProps = {};

  if ( disk.hasOwnProperty( "mediasize" ) ) {
    calculatedProps.humanSize = ByteCalc.humanize( disk.mediasize );
    // FIXME: TEMPORARY WORKAROUND
    calculatedProps.driveName = calculatedProps.humanSize + " Drive";
  }

  return calculatedProps;
}

function handlePayload ( payload ) {
  const ACTION = payload.action;

  switch ( ACTION.type ) {

    case ActionTypes.RECEIVE_DISKS_OVERVIEW:
      let newDisks = {};

      ACTION.disksOverview.forEach(
        function iterateDisks ( disk ) {
          newDisks[ disk[ this.KEY_UNIQUE ] ] =
            _.merge( getCalculatedDiskProps( disk ), disk );
        }.bind( this )
      );

      _.merge( _disks, newDisks );
      this.fullUpdateAt = ACTION.timestamp;
      this.emitChange();
      break;

    case ActionTypes.RECEIVE_DISK_DETAILS:
      if ( _disks.hasOwnProperty( ACTION.diskDetails[ this.KEY_UNIQUE ] ) ) {
        // This disk has already been instantiated, and we should atttempt to
        // patch new information on top of it
        _.merge( _disks[ this.KEY_UNIQUE ], ACTION.diskDetails );
      } else {
        // There is no current record for a disk with this identifier, so this
        // will be the initial data.
        _disks[ ACTION.diskDetails[ this.KEY_UNIQUE ] ] = ACTION.diskDetails;
      }
      this.emitChange();
      break;

    case ActionTypes.MIDDLEWARE_EVENT:
      // TODO: There is currently no correct thing to subscribe to
      break;
  }
}

export default new DisksStore();
