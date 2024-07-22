import { QuickBrowseProfile } from "./QuickBrowseProfile";

export class QuickBrowseUserConfig {
    public readonly profiles: QuickBrowseProfile[];

    public activeProfile: QuickBrowseProfile;

    public constructor(profiles: QuickBrowseProfile[], activeProfile: QuickBrowseProfile) {
        this.profiles = profiles;
        this.activeProfile = activeProfile;
    }
}