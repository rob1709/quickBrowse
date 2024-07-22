import { QuickBrowseProfile } from "./QuickBrowseProfile";

export class QuickBrowseUserConfig {
    public readonly profiles: QuickBrowseProfile[];

    public constructor(profiles: QuickBrowseProfile[]) {
        this.profiles = profiles;
    }
}