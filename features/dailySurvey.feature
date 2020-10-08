Feature: AT WEB Test
    QA Test for AT website

    @positive @survey
    Scenario: I fill daily Checkin
        Given I open daily checkin website
        When I check the agreement and click next
        And I fill my name with "Muhammad Rafdi" and NPK with "7204"
        And I fill the rest of the questionnaire
