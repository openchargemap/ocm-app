import { ConnectionType, Country, OperatorInfo, DataProvider, UsageType, StatusType, CheckinStatusType, SubmissionStatusType, LevelType, CurrentType, CommentType } from "./CoreDataModel";

export interface CoreReferenceData {
    CacheDate: Date;
    ConnectionTypes: Array<ConnectionType>;
    Countries: Array<Country>;
    Operators: Array<OperatorInfo>;
    DataProviders: Array<DataProvider>;
    UsageTypes: Array<UsageType>;
    StatusTypes: Array<StatusType>;
    CheckinStatusTypes: Array<CheckinStatusType>;
    SubmissionStatusTypes: Array<SubmissionStatusType>;
    ChargerTypes: Array<LevelType>;
    CurrentTypes: Array<CurrentType>;
    UserCommentTypes: Array<CommentType>;
    DataTypes: Array<any>;
    MetadataGroups: Array<any>;
    UserProfile: any;
}

