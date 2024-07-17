Feature: Bookmark favicons

Scenario: Bookmarks should include the favicon  
  Given I have an empty list of bookmarks
  And I add a bookmark called 'Amazon' for 'https://www.amazon.co.uk'
  And I add a bookmark called 'Reddit' for 'https://old.reddit.com'
  When I view bookmarks alphabetically by name
  Then the favicon for 'Amazon' is 'https://www.amazon.co.uk/favicon.ico'
  And the favicon for 'Reddit' is 'https://old.reddit.com/favicon.ico'

Scenario: Bookmarks should include the favicon even if the bookmark URL doesn't point at the root of the webpage
  Given I have an empty list of bookmarks
  And I add a bookmark called 'BBC Football' for 'https://www.bbc.co.uk/sport/football'
  When I view bookmarks alphabetically by name
  Then the favicon for 'BBC Football' is 'https://www.bbc.co.uk/favicon.ico'

Scenario: Bookmarks without https should still work
  Given I have an empty list of bookmarks
  And I add a bookmark called 'BBC Football' for 'www.bbc.co.uk/sport/football'
  When I view bookmarks alphabetically by name
  Then the favicon for 'BBC Football' is 'https://www.bbc.co.uk/favicon.ico'  