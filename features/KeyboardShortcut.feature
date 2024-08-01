Feature: Keyboard Shortcuts

Scenario: Pressing a keyboard shortcut that's defined
  Given I have an empty list of bookmarks
  And I add a bookmark called 'Amazon' for 'www.amazon.co.uk' with shortcut 'a'
  And I add a bookmark called 'Reddit' for 'old.reddit.com' with shortcut 'i'
  When the extension is open and I press 'a'
  Then the URL is 'https://www.amazon.co.uk'

  Scenario Outline: Pressing a keyboard shortcut is case insensitive if there are no conflicts, and case sensitive if so
    Given I have an empty list of bookmarks
    And I add a bookmark called 'Amazon' for 'www.amazon.co.uk' with shortcut '<amazon_shortcut>'
    And I add a bookmark called 'Apple' for 'www.apple.com' with shortcut '<apple_shortcut>'
    When the extension is open and I press '<pressed_key>'
    Then the URL is '<expected_url>'

  Examples:
    | amazon_shortcut | apple_shortcut | pressed_key | expected_url                |
    | a               | p              | a           | https://www.amazon.co.uk    |
    | a               | p              | A           | https://www.amazon.co.uk    |
    | a               | A              | a           | https://www.amazon.co.uk    |
    | a               | A              | A           | https://www.apple.com       |

  Scenario: Shortcuts can contain dynamic placeholders
  Given I have an empty list of bookmarks
  And I add a bookmark called 'Amazon' for 'www.amazon.co.uk/item/{Item ID}/country/{Country Code}' with shortcut 'a'
  When the extension is open and I press 'a'
  Then this asks me to enter a value for placeholder 'Item ID'
  And this asks me to enter a value for placeholder 'Country Code'

 
Scenario: Shortcuts can contain dynamic placeholders
  Given I have an empty list of bookmarks
  And I add a bookmark called 'Amazon' for 'www.amazon.co.uk/item/{Item ID}/country/{Country Code}' with shortcut 'a'
  When the extension is open and I press 'a'
  And I set placeholder 'Item ID' to '363'
  And I set placeholder 'Country Code' to 'GB'
  Then the URL is 'https://www.amazon.co.uk/item/363/country/GB'

Scenario: Replacements are encoded 
  Given I have an empty list of bookmarks
  And I add a bookmark called 'Amazon' for 'www.amazon#.co.uk/item/{Item ID}/country/{Country Code}' with shortcut 'a'
  When the extension is open and I press 'a'
  And I set placeholder 'Item ID' to '#23'
  And I set placeholder 'Country Code' to '#24'
  Then the URL is 'https://www.amazon#.co.uk/item/%2323/country/%2324'  