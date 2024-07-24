import { QuickBrowseProfile } from "../model/QuickBrowseProfile";

export interface QuickBrowseStorageManager {
    loadQuickBrowseConfig(): Promise<QuickBrowseProfile>;
    saveQuickBrowseProfile(userConfig: QuickBrowseProfile): void;
}