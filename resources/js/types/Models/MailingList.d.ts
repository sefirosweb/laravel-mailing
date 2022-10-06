type MailingList = {
    id: number;
    name: string;
    code: string;
    description: string | null;
    deleted_at: string /* Date */;
    created_at?: any;
    updated_at?: any;
    users?: User[] | null;
    groups?: MailingGroup[] | null;
}
