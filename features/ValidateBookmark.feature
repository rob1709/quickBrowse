Feature: Editing bookmarks

Scenario: Editing bookmark to have its own existing shortcut
  Given I have an empty list of bookmarks
  And I add a bookmark called 'Amazon' for 'www.amazon.co.uk' with shortcut 'a'
  And I add a bookmark called 'Reddit' for 'www.reddit.com' with shortcut 'i'
  When I validate amending this to be 'Reddit' for url 'old.reddit.com' with shortcut 'i'
  Then this is valid

Scenario: Editing bookmark to have a new unused shortcut
  Given I have an empty list of bookmarks
  And I add a bookmark called 'Amazon' for 'www.amazon.co.uk' with shortcut 'a'
  And I add a bookmark called 'Reddit' for 'www.reddit.com' with shortcut 'i'
  When I validate amending this to be 'Reddit' for url 'old.reddit.com' with shortcut 'b'
  Then this is valid  

Scenario: Editing bookmark to have a conflicting shortcut
  Given I have an empty list of bookmarks
  And I add a bookmark called 'Amazon' for 'www.amazon.co.uk' with shortcut 'a'
  And I add a bookmark called 'Reddit' for 'www.reddit.com' with shortcut 'i'
  When I validate amending this to be 'Reddit' for url 'old.reddit.com' with shortcut 'a'
  Then this states "Shortcut 'a' already in use for Amazon"

Scenario: Adding bookmark with new unused shortcut
  Given I have an empty list of bookmarks
  And I add a bookmark called 'Amazon' for 'www.amazon.co.uk' with shortcut 'a'
  And I add a bookmark called 'Reddit' for 'www.reddit.com' with shortcut 'i'
  When I validate amending this to be 'BBC Footballl' for url 'www.bbc.com' with shortcut 'b'
  Then this is valid  

Scenario: Adding bookmark with same letter in a different case
  Given I have an empty list of bookmarks
  And I add a bookmark called 'Amazon' for 'www.amazon.co.uk' with shortcut 'a'
  And I add a bookmark called 'Reddit' for 'www.reddit.com' with shortcut 'i'
  When I validate amending this to be 'Apple' for url 'www.apple.com' with shortcut 'A'
  Then this is valid    

Scenario: Adding bookmark for conflicting shortcut
  Given I have an empty list of bookmarks
  And I add a bookmark called 'Amazon' for 'www.amazon.co.uk' with shortcut 'a'
  And I add a bookmark called 'Reddit' for 'www.reddit.com' with shortcut 'i'
  When I validate amending this to be 'Apple' for url 'www.apple.com' with shortcut 'a'
  Then this states "Shortcut 'a' already in use for Amazon"  