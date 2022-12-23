
export interface BaseButton {
    enabled?: boolean,
    buttonStyle?: any,
    displayMode?: "TextOnly" | "ImageOnly" | "ImageBeforeText" | "ImageAfterText",
    fullWidth?: boolean,
    iconClass?: string,
    imageHeight?: number,
    imageWidth?: number,
    imageUrl?: string,
    outlined?: boolean,
    size?: "Default" | "Small" | "Large",
    spacing?: {
        bottomSpacing?: boolean,
        topSpacing?: boolean
    },
    text?: string,
    textDisplay?: "Default" | "Trimmed",
    visibility?: boolean
    ID?: string,
    onClick: Function
}

export enum DISPLAY_MODE {
    TEXT_ONLY = "TextOnly",
    IMAGE_ONLY = "ImageOnly",
    IMAGE_BEFORE_TEXT = "ImageBeforeText",
    IMAGE_AFTER_TEXT = "ImageAfterText"
}

export enum SIZE {
    DEFAULT = "Default",
    SMALL = "Small",
    LARGE = "Large"
}

