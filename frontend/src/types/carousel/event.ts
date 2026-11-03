export type event = {
    type: "Evento";
    title: string;
    startDate: Date;
    endDate: Date;
    local: string;
    imageUrl: string;
    pathUrl: string;
    tags: string[]
    visible: boolean;
}