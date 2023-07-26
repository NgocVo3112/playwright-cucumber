Feature: Basic Search flow

  Background: 
    Given User navigates to the Marsair application

  Scenario Outline: Basic Search flow - Invalid Return Dates when return date is less than 1 year from the departure.
    And User select Departing as "<departing>"
    And User select the Returning as "<returning>"
    And User enter the Promotional Code as "<promotional code>"
    When User click on Search button
    Then The messgage display “Unfortunately, this schedule is not possible. Please try again.”
    When User click on the MarsAir logo
    Then The homepage display

    Examples: 
      | departing            | returning                 | promotional code |
      | July                 | July                      |                  |
      | July                 | December                  |                  |
      | December             | December                  |                  |
      | December             | July (next year)          | AF3-FJK-418      |
      | July (next year)     | December (next year)      |                  |
      | December (next year) | July (two years from now) |                  |

  Scenario Outline: Basic Search flow - Verify the unavailability of seats when no seats are available
    And User select Departing as "<departing>"
    And User select the Returning as "<returning>"
    And User enter the Promotional Code as "<promotional code>"
    When User click on Search button
    Then The messgage display “Sorry, there are no more seats available.”
    When User click on Back link
    Then The homepage display

    Examples: 
      | departing            | returning                     | promotional code |
      | July                 | July (next year)              |                  |
      | July                 | December (next year)          | AF3-FJK-418XX    |
      | July                 | July (two years from now)     | JJ0-OPQ-325      |
      | December             | December (next year)          | AF3-FJK-418      |
      | December             | December (two years from now) | JJ5-OPQ-320      |
      | July (next year)     | July (two years from now)     | sf3-fjk-418      |
      | July (next year)     | December (two years from now) |                  |
      | December (next year) | December (two years from now) |                  |

  Scenario Outline: Basic Search flow - Verify the availability of seats when seats are available with valid promotional code format
    And User select Departing as "<departing>"
    And User select the Returning as "<returning>"
    And User enter the Promotional Code as "<promotional code>"
    When User click on Search button
    Then The rearch result displays with Seats available, promotional code as "<promotional code>", discount and Call To Book messgage
    When User click on Back link
    Then The homepage display

    Examples: 
      | departing | returning                     | promotional code |
      | July      | December (two years from now) | AF3-FJK-418      |
      | July      | December (two years from now) | sf3-fjk-418      |
      | July      | December (two years from now) | JJ0-OPQ-325      |
      | July      | December (two years from now) | @F3-FJK-418      |

  Scenario Outline: Basic Search flow - Verify the availability of seats when seats are available without input promotional code
    And User select Departing as "<departing>"
    And User select the Returning as "<returning>"
    When User click on Search button
    Then The rearch result displays with Seats available, and Call To Book messgage
    When User click on Back link
    Then The homepage display

    Examples: 
      | departing | returning                     |
      | July      | December (two years from now) |

  Scenario Outline: Basic Search flow - Trips for the next two years should be searchable with invalid promotional code format
    And User select Departing as "<departing>"
    And User select the Returning as "<returning>"
    And User enter the Promotional Code as "<promotional code>"
    When User click on Search button
    Then The rearch result displays with Seats available, Call To Book messgage and invalid promotional code "<promotional code>" warning
    When User click on Back link
    Then The homepage display

    Examples: 
      | departing | returning                     | promotional code |
      | July      | December (two years from now) | AF3-FJK-419      |
      | July      | December (two years from now) | @F3-FJK-419      |
      | July      | December (two years from now) | F3-FJK-419       |
