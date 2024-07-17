Feature: Adding bookmarks

Scenario: Bookmarks, alphabetically by name
  Given I have an empty list of bookmarks
  And I add a bookmark called 'Amazon' for 'www.amazon.co.uk'
  And I add a bookmark called 'Reddit' for 'old.reddit.com'
  When I view bookmarks alphabetically by name
  Then bookmark 1 is for 'Amazon' with url 'www.amazon.co.uk'
  Then bookmark 2 is for 'Reddit' with url 'old.reddit.com'