import fetch from "node-fetch";
import Client from "../../base/Client";
import { BASE_URL } from "../../shared/constants";
import { HTTPError } from "../../shared/errors";
import { UserData } from "../../types/classes";

export default class User {
    public constructor(public readonly client: Client, private data: UserData) {
        this.client.emit("userCreate", this);
    }

    public get id() {
        return this.data.id;
    }

    public get login() {
        return this.data.login;
    }

    public get displayName() {
        return this.data.display_name;
    }

    public get type() {
        return this.data.type;
    }

    public get broadcasterType() {
        return this.data.broadcaster_type;
    }

    public get profileImageURL() {
        return this.data.profile_image_url;
    }

    public get offlineImageURL() {
        return this.data.offline_image_url;
    }

    public get viewCount() {
        return this.data.view_count;
    }

    /**
     * Returns the email of the user.
     * Will be undefined if scope `user:read:email` is not provided.
     */
    public get email() {
        return this.data.email;
    }

    public get createdAt() {
        return new Date(this.data.created_at);
    }

    public get createdTimestamp() {
        return new Date(this.data.created_at).getTime();
    }

    public async update() {
        if (!this.client.options.update.channels) {
            if (!this.client.options.handleRejections)
                throw new Error(`updating users was disabled but was still attempted`);

            return;
        }

        if (!this.client.token) throw new Error("token is not available");

        const response = await fetch(`${BASE_URL}/users`, {
            headers: {
                Authorization: `OAuth ${this.client.token}`,
            },
        }).catch((e) => {
            throw new HTTPError(e);
        });

        if (response.ok) return void (this.data = await response.json());

        if (!this.client.options.handleRejections) throw new Error("unable to update user");

        return;
    }
}
