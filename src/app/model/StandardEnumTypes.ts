export enum StandardStatusTypes {
    Unknown = 0,
    CurrentlyAvailable = 10,
    CurrentlyInUse = 20,
    TemporarilyUnavailable = 30,
    Operational = 50,
    PartlyOperational = 75,
    NotOperational = 100,
    PlannedForFutureDate = 150,
    RemovedDecomissioned = 200
}


export enum StandardOperators {
    UnknownOperator = 1,
    SiteOwner = 45
}

export enum StandardCommentTypes {
    GeneralComment = 10,
    ImportantNotice = 50,
    SuggestedChange = 100,
    SuggestedChangeActioned = 110,
    FaultReport = 1000
}

export enum StandardCurrentTypes {
    SinglePhaseAC = 10,
    ThreePhaseAC = 20,
    DC = 30
}