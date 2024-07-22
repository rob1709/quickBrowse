Feature: Importing from site launcher

Scenario: Import from site launcher
  Given I have exported by site launcher config
  And I ask to import this under a collection called 'Default'
  When I run the import
  Then I have a new collection called 'Default'
  And my bookmark list contains an entry for 'Amazon' with url 'https://smile.amazon.co.uk/' and shortcut 'a'
  And my bookmark list contains an entry for 'BBC News' with url 'https://www.bbc.co.uk/news' and shortcut 'n'
  And my bookmark list contains an entry for 'Duckduckgo' with url 'https://duckduckgo.com/' and shortcut 'g'
  And my bookmark list contains an entry for 'Excalidraw' with url 'https://excalidraw.com/ and shortcut 'e'
  And my bookmark list contains an entry for 'YouTube' with url 'http://www.youtube.com/' and shortcut 'y'