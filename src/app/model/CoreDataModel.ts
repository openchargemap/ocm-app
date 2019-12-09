/**
 * A POI holds high level information such as network operator Id, data provider Id, an AddressInfo object
 * and a collection of Connections (equipment info) and optionally extended MetadataValues
 */
export interface POIDetails {
    /**
     * OCM-ID of this charging equipment site
     * */
    ID: number;

    /**
     * ID of the source data provider (if imported)
     * */
    DataProviderID: number;

    /**
     * Data Provider's own reference for this site
     * */
    DataProvidersReference: string | null;

    /**
    * Network operator ID
    * */
    OperatorID: number | null;

    /**
    * Network Operator's own reference for this site
    * */
    OperatorsReference: string | null;

    /**
    * Usage Type (public etc) for this group of equipment
    * */
    UsageTypeID: number | null;

    /**
     * Free text description of usage costs associated with this site or equipment
     */
    UsageCost: string | null;

    /**
     * Location of the equipment including an approximate address
     */
    AddressInfo: AddressInfo;

    /**
     * Number of vehicle bays/stations available to charge at. Some physical stations may be able to service multiple bays.
     */
    NumberOfPoints: number;

    /**
     * Free text general information
     */
    GeneralComments: string | null;

    /**
     * If specified, date the equipment is planned for commissioning.
     */
    DatePlanned: Date | null;

    /**
     * Overall status for this site (e.g. Operational, Non-Operational)
     */
    StatusTypeID: number;

    /**
     * Status of this listing (e.g. Published or Awaiting Review)
     */
    SubmissionStatusTypeID: number;

    /**
     * List of equipment details for stations available at this site
     */
    Connections: ConnectionInfo[];

    /**
     * Optional list of metadata values such as data attribution info
     */
    MetadataValues: MetadataValue[] | null;
}

/**
 * When fully populated a POI can hold references to related reference data object (like DataProvider)
 * and may have other extended dat like DataQualityLevel, UserComments, MediaItems
 */
export interface ExtendedPOIDetails extends POIDetails {
    UUID: string;
    ParentChargePointID: number | null;
    DataProvider: DataProvider | null;
    OperatorInfo: OperatorInfo | null;
    UsageType: UsageType | null;
    AddressInfo: AddressInfo | ExtendedAddressInfo;
    DateLastConfirmed: Date | null;
    StatusType: StatusType | null;
    DateLastStatusUpdate: Date | null;
    DataQualityLevel: number | null;
    DateCreated: Date;
    SubmissionStatus: SubmissionStatusType | null;
    UserComments: UserComment[] | null;
    MediaItems: MediaItem[] | null;
    PercentageSimilarity: number | null;
    IsRecentlyVerified: boolean;
    DateLastVerified: Date | null;
    Distance: number | null;
    Connections: ExtendedConnectionDetails[];
}

export interface AddressInfo {
    ID?: number;
    Title: string;
    AddressLine1: string;
    AddressLine2?: string | null;
    Town?: string | null;
    StateOrProvince?: string | null;
    Postcode?: string | null;
    CountryID: number;
    Latitude: number;
    Longitude: number;
    ContactTelephone1?: string | null;
    ContactTelephone2?: string | null;
    ContactEmail?: string | null;
    AccessComments?: string | null;
    RelatedURL?: string | null;
}

export interface ExtendedAddressInfo extends AddressInfo {
    Country: Country | null;
    Distance: number;
    DistanceUnit: number;
}

export interface Country {
    ISOCode: string;
    ContinentCode: string;
    ID: number;
    Title: string;
}

export interface ConnectionInfo {
    ID: number;
    ConnectionTypeID: number;
    Reference?: null | string;
    StatusTypeID: number | null;
    LevelID?: number;
    Amps?: number | null;
    Voltage?: number | null;
    PowerKW: number;
    CurrentTypeID?: number | null;
    Quantity: number | null;
    Comments?: null | string;
}

export interface ExtendedConnectionDetails extends ConnectionInfo {
    ConnectionType: ConnectionType;
    StatusType: StatusType | null;
    Level: LevelType;
    CurrentType: CurrentType | null;
}

export interface ConnectionType {
    ID: number;
    Title: string;
    FormalName: string | null;
    IsDiscontinued: boolean | null;
    IsObsolete: boolean | null;
}

export interface CurrentType {
    ID: number;
    Title: string;
    Description: string;
}

export interface LevelType {
    ID: number;
    Title: string;
    Comments: string;
    IsFastChargeCapable: boolean;
}

export interface StatusType {
    ID: number;
    Title: string;
    IsOperational: boolean;
    IsUserSelectable: boolean;
}

export interface DataProvider {
    WebsiteURL: string;
    Comments: null;
    DataProviderStatusType: DataProviderStatusType;
    IsRestrictedEdit: boolean;
    IsOpenDataLicensed: boolean;
    IsApprovedImport: boolean;
    License: string;
    DateLastImported: Date | null;
    ID: number;
    Title: string;
}

export interface DataProviderStatusType {
    ID: number;
    IsProviderEnabled: boolean;
    Title: string;
}

export interface MediaItem {
    ID: number;
    ChargePointID: number;
    ItemURL: string;
    ItemThumbnailURL: string;
    Comment: string;
    IsEnabled: boolean;
    IsVideo: boolean;
    IsFeaturedItem: boolean;
    IsExternalResource: boolean;
    MetadataValue: null;
    User: UserProfile;
    DateCreated: Date;
}

export interface UserProfile {
    Username: string;
    EmailAddress: string;
    Profile: string;
    Location: string;
    WebsiteURL: string;
    ReputationPoints: number;
    ProfileImageURL: string;
}

export interface ExtendedUserProfile {
    ID: number;
    IdentityProvider: string;
    Identifier: string;
    CurrentSessionToken: string;
    Permissions: string;
    PermissionsRequested: string;
    DateCreated: Date;
    DateLastLogin: Date;
    IsProfilePublic: boolean;
    IsEmergencyChargingProvider: boolean;
    IsPublicChargingProvider: boolean;
    Latitude: number;
    Longitude: number;
    EmailAddress: string;
    EmailHash: string;
    ProfileImageURL: string;
    IsCurrentSessionTokenValid: boolean;
    APIKey: string;
    SyncedSettings: object;
}

export interface MetadataValue {
    ID: number;
    MetadataFieldID: number;
    ItemValue: string;
    MetadataFieldOption: null;
    MetadataFieldOptionID: null;
}

export interface OperatorInfo {
    WebsiteURL: null | string;
    Comments: null | string;
    PhonePrimaryContact: null | string;
    PhoneSecondaryContact: null | string;
    IsPrivateIndividual: boolean | null;
    AddressInfo: null;
    BookingURL: null;
    ContactEmail: null | string;
    FaultReportEmail: null | string;
    IsRestrictedEdit: boolean | null;
    ID: number;
    Title: string;
}

export interface SubmissionStatusType {
    ID: number;
    IsLive: boolean;
    Title: string;
}

export interface UsageType {
    IsPayAtLocation: boolean | null;
    IsMembershipRequired: boolean | null;
    IsAccessKeyRequired: boolean | null;
    ID: number;
    Title: string;
}

export interface UserComment {
    ID: number;
    ChargePointID: number;
    CommentTypeID: number;
    UserName: string;
    Comment: string;
    Rating: number;
    RelatedURL: string;
    CheckinStatusTypeID: number;
}

export interface ExtendedUserComment extends UserComment {
    CommentType: CommentType;
    DateCreated: Date;
    User: UserProfile;
    CheckinStatusType: CheckinStatusType;
    IsActionedByEditor?: boolean;
}

export interface CheckinStatusType {
    IsPositive: boolean;
    IsAutomatedCheckin: boolean;
    ID: number;
    Title: string;
}

export interface CommentType {
    ID: number;
    Title: string;
}
