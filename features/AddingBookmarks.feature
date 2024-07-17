Feature: Adding bookmarks

Scenario: Adding two bookmarks
  Given I have an empty list of bookmarks
  When I add a bookmark called 'Amazon' for 'www.amazon.co.uk'
  And I add a bookmark called 'Reddit' for 'old.reddit.com'
  Then my bookmark list contains an entry for 'Amazon' with url 'www.amazon.co.uk'
  And my bookmark list contains an entry for 'Reddit' with url 'www.reddit.com'