/*
export interface IClickEventLocation{
    eventLocation: string;
    clicked: boolean;
}

export const clickEventLocation: IClickEventLocation[] = [
    {
        eventLocation: "form-drawer",
        clicked: false
    },
    {
        eventLocation: "project-name-palet",
        clicked: false
    },
    {
        eventLocation: "palet-popover",
        clicked: false
    }
]
//*/

export enum ClickEventLocation {
    formDrawer,
    dateColumn,
    paletEllipsis
}