Feature: Editing bookmarks

Scenario: Delete bookmark
  Given I have an empty list of bookmarks
  And I add a bookmark called 'Reddit' for 'www.reddit.com' with shortcut 'i'
  And I add a bookmark called 'Amazon' for 'www.amazon.co.uk' with shortcut 'a'
  When I delete this bookmark
  Then my bookmark list contains an entry for 'Reddit' with url 'www.reddit.com'
  And my bookmark list does not contain an entry for 'Amazon'
