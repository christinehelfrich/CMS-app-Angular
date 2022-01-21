export class Contact {
    public id: string;
    public name: string;
    public email: string;
    public phone: string;
    public imgUrl: string;

    constructor(id: string, name: string, email: string, phone: string, imgUrl: string ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.imgUrl = imgUrl;
    }
}