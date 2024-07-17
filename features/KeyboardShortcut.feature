Feature: Keyboard Shortcuts

Scenario: Pressing a keyboard shortcut that's defined
  Given I have an empty list of bookmarks
  And I add a bookmark called 'Amazon' for 'www.amazon.co.uk' with shortcut 'a'
  And I add a bookmark called 'Reddit' for 'old.reddit.com' with shortcut 'i'
  When the extension is open and I press 'a'
  Then the URL is 'www.amazon.co.uk'