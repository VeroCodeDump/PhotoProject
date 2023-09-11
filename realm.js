import Realm from "realm";

class Photo extends Realm.Object { }
Photo.schema = {
    name: "Photo",
    properties: {
        id: "string",
        owner: "string",
        secret: "string",
        server: "string",
        farm: { type: "int", default: 0 },
        title: "string",
        isfriend: { type: "int", default: 0 },
        isfamily: { type: "int", default: 0 },
        ispublic: { type: "int", default: 0 },
        is_primary: { type: "int", default: 0 },
        has_comment: { type: "int", default: 0 },




    },
    primaryKey: "id",
};

export default new Realm({ schema: [Photo] });