Feature: Editing bookmarks

Scenario: Editing bookmark name / url
  Given I have an empty list of bookmarks
  And I add a bookmark called 'Amazon' for 'www.amazon.co.uk' with shortcut 'a'
  When I edit this to be 'Reddit' for url 'old.reddit.com' with shortcut 'i'
  Then my bookmark list contains an entry for 'Reddit' with url 'https://old.reddit.com'
  And my bookmark list does not contain an entry for 'Amazon'
