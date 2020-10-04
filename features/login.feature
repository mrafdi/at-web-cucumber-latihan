Feature: AT WEB Test
    QA Test for AT website

    @positive @signIn
    Scenario: I login to iServe website
        Given I open iServe website
        When I do login at iServe website
        And I click Sign In button
        Then I can see "PERSONAL DASHBOARD"