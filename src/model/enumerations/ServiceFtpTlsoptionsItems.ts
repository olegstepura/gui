const ServiceFtpTlsoptionsItems = {
    ALLOW_CLIENT_RENEGOTIATIONS: 'ALLOW_CLIENT_RENEGOTIATIONS' as 'ALLOW_CLIENT_RENEGOTIATIONS',
    ALLOW_DOT_LOGIN: 'ALLOW_DOT_LOGIN' as 'ALLOW_DOT_LOGIN',
    ALLOW_PER_USER: 'ALLOW_PER_USER' as 'ALLOW_PER_USER',
    COMMON_NAME_REQUIRED: 'COMMON_NAME_REQUIRED' as 'COMMON_NAME_REQUIRED',
    ENABLE_DIAGNOSTICS: 'ENABLE_DIAGNOSTICS' as 'ENABLE_DIAGNOSTICS',
    EXPORT_CERTIFICATE_DATA: 'EXPORT_CERTIFICATE_DATA' as 'EXPORT_CERTIFICATE_DATA',
    NO_CERTIFICATE_REQUEST: 'NO_CERTIFICATE_REQUEST' as 'NO_CERTIFICATE_REQUEST',
    NO_EMPTY_FRAGMENTS: 'NO_EMPTY_FRAGMENTS' as 'NO_EMPTY_FRAGMENTS',
    NO_SESSION_REUSE_REQUIRED: 'NO_SESSION_REUSE_REQUIRED' as 'NO_SESSION_REUSE_REQUIRED',
    STANDARD_ENV_VARS: 'STANDARD_ENV_VARS' as 'STANDARD_ENV_VARS',
    DNS_NAME_REQUIRED: 'DNS_NAME_REQUIRED' as 'DNS_NAME_REQUIRED',
    IP_ADDRESS_REQUIRED: 'IP_ADDRESS_REQUIRED' as 'IP_ADDRESS_REQUIRED'
};
type ServiceFtpTlsoptionsItems = (typeof ServiceFtpTlsoptionsItems)[keyof typeof ServiceFtpTlsoptionsItems];
export {ServiceFtpTlsoptionsItems};