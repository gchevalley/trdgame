<template>
  <survey :survey="survey"></survey>
</template>

<script>

import {store} from '../store/store.js';

import * as SurveyVue from 'survey-vue'
var Survey = SurveyVue.Survey
Survey.cssType = "bootstrap";

export default {
  data () {
    var surveyJSONRisks = {
      goNextPageAutomatic: true,
      pages: [
        {
          elements: [
            {
              type: "html",
              html: "<h1>Market Risk assesment form</h1><p>Please be advised that one should always know the exact number of shares in their portfolio.</p><p>Thus, any mis-estimation will result in substential penalties as described below:</p><ul><li><strong>Underestimation</strong>: Any underestimation will decrease the number of shares one actually own to the figure they have announced in the risk form. Moreover, a 10% cash penalty will be applied.</li><li><strong>Overestimation</strong>: Any overestimation will result in a 10% cash penalty.</li></ul>",
              name: "question1",
              title: "question1"
            },
            {
              type: "text",
              isRequired: true,
              name: "shares",
              title: "How many shares do you currently have in portfolio ?"
            }
          ],
          name: "page1"
        }
      ],
      showCompletedPage: false,
      showNavigationButtons: false
    };

    var surveyJSONDerivatives = {
      goNextPageAutomatic: true,
      pages: [
        {
          elements: [
            {
              type: "html",
              html: "<h1>Derivatives exam</h1><p>Just as a reminder, all finance students said in their resume they were derivatives specialists.</p>",
              name: "question1",
              title: "question1"
            },
            {
              type: "radiogroup",
              choices: [
                {
                  value: "yes",
                  text: "Yes, cost is CHF 100k with the possiblity to win up to CHF +1mln"
                },
                {
                  value: "no",
                  text: "No, -> back to the trading platform"
                }
              ],
              isRequired: true,
              name: "question2",
              title: "Would you like to take part ?"
            }
          ],
          name: "page1"
        },
        {
          elements: [
            {
              type: "radiogroup",
              choices: [
                {
                  value: "item1",
                  text: "spot 200, strike 200"
                },
                {
                  value: "item2",
                  text: "spot 200, strike 190"
                },
                {
                  value: "response",
                  text: "spot 200, strike 220"
                },
                {
                  value: "item4",
                  text: "data insufficient"
                }
              ],
              name: "question3",
              title: "Which of these call options are OTM ?"
            }
          ],
          name: "page2",
          visible: false,
          visibleIf: "{question2} = 'yes'"
        },
        {
          elements: [
            {
              type: "radiogroup",
              choices: [
                {
                  value: "item1",
                  text: "exercise the option"
                },
                {
                  value: "response",
                  text: "square off the option"
                },
                {
                  value: "item3",
                  text: "do not do anything"
                },
                {
                  value: "item4",
                  text: "wait for some more time"
                }
              ],
              name: "question4",
              title: "A call option is quoted at a premium of $25. the strike is $180 and spot $200. The option was purchased at $10. The best way to exit this option is :"
            }
          ],
          name: "page3",
          visible: false,
          visibleIf: "{question2} = 'yes'"
        },
        {
          elements: [
            {
              type: "radiogroup",
              choices: [
                {
                  value: "response",
                  text: "unlimited"
                },
                {
                  value: "item2",
                  text: "premium received"
                },
                {
                  value: "item3",
                  text: "depends on the strike price"
                },
                {
                  value: "item4",
                  text: "depend on the type of the option like call or put"
                }
              ],
              name: "question5",
              title: "What could be the maximum profit for a buyer of options contract ?"
            }
          ],
          name: "page4",
          visible: false,
          visibleIf: "{question2} = 'yes'"
        },
        {
          elements: [
            {
              type: "radiogroup",
              choices: [
                {
                  value: "item1",
                  text: "the strike price is greater than the market price of the underlying stock"
                },
                {
                  value: "item2",
                  text: "the strike price is equal to the market price of the undelying stock"
                },
                {
                  value: "response",
                  text: "the strike price is less than the market price of the underlying stock"
                },
                {
                  value: "item4",
                  text: "none of the above"
                }
              ],
              name: "question6",
              title: "a call option is said to be in-the-money if:"
            }
          ],
          name: "page5",
          visible: false,
          visibleIf: "{question2} = 'yes'"
        },
        {
          elements: [
            {
              type: "radiogroup",
              choices: [
                {
                  value: "response",
                  text: "spot price + cost of carry"
                },
                {
                  value: "item2",
                  text: "spot price - cost of carry"
                },
                {
                  value: "item3",
                  text: "spot price * cost of carry"
                },
                {
                  value: "item4",
                  text: "spot price / cost of carry"
                }
              ],
              name: "question7",
              title: "Fair value of futures contract is:"
            }
          ],
          name: "page6",
          visible: false,
          visibleIf: "{question2} = 'yes'"
        },
        {
          elements: [
            {
              type: "radiogroup",
              choices: [
                {
                  value: "item1",
                  text: "294"
                },
                {
                  value: "item2",
                  text: "300"
                },
                {
                  value: "item3",
                  text: "284"
                },
                {
                  value: "response",
                  text: "304"
                }
              ],
              name: "question8",
              title: "BABA spot is $290, strike $280, premium $24. At what spot price will the above call option break even:"
            }
          ],
          name: "page7",
          visible: false,
          visibleIf: "{question2} = 'yes'"
        },
        {
          elements: [
            {
              type: "radiogroup",
              choices: [
                {
                  value: "response",
                  text: "the amount the option is ITM"
                },
                {
                  value: "item2",
                  text: "the amount the option is OTM"
                },
                {
                  value: "item3",
                  text: "the amount the option is ATM"
                },
                {
                  value: "item4",
                  text: "strike price - spot price"
                }
              ],
              name: "question9",
              title: "The intrinsic value of a call option is:"
            }
          ],
          name: "page8",
          visible: false,
          visibleIf: "{question2} = 'yes'"
        },
        {
          elements: [
            {
              type: "radiogroup",
              choices: [
                {
                  value: "item1",
                  text: "future contract"
                },
                {
                  value: "response",
                  text: "forward contract"
                },
                {
                  value: "item3",
                  text: "swaptions"
                },
                {
                  value: "item4",
                  text: "none of the above"
                }
              ],
              name: "question10",
              title: "A local jeweler agrees to buy 3kg of gold from whole sale gold trader after 2 months. What type of contract we are reffering here to ?"
            }
          ],
          name: "page9",
          visible: false,
          visibleIf: "{question2} = 'yes'"
        },
        {
          elements: [
            {
              type: "radiogroup",
              choices: [
                {
                  value: "item1",
                  text: "True"
                },
                {
                  value: "response",
                  text: "False"
                }
              ],
              name: "question11",
              title: "An open interest is the total number of contract traded in a month for an underlying asset ?"
            }
          ],
          name: "page10",
          visible: false,
          visibleIf: "{question2} = 'yes'"
        },
        {
          elements: [
            {
              type: "radiogroup",
              choices: [
                {
                  value: "item1",
                  text: "the clearing corporation"
                },
                {
                  value: "item2",
                  text: "only the seller"
                },
                {
                  value: "item3",
                  text: "only the buyer"
                },
                {
                  value: "response",
                  text: "both the buyer and the seller"
                }
              ],
              name: "question12",
              title: "Margins in futures trading are to be paid by ___"
            }
          ],
          name: "page11",
          visible: false,
          visibleIf: "{question2} = 'yes'"
        },
        {
          elements: [
            {
              type: "radiogroup",
              choices: [
                {
                  value: "item1",
                  text: "140"
                },
                {
                  value: "item2",
                  text: "138"
                },
                {
                  value: "response",
                  text: "142"
                },
                {
                  value: "item4",
                  text: "data insufficient"
                }
              ],
              name: "question13",
              title: "On 1st April EURO STOXX Automobiles & Parts Futures price is €140 and spot price is €138. Spot closed on the expiry date at €142. What should be the future price on expiry date ?"
            }
          ],
          name: "page12",
          visible: false,
          visibleIf: "{question2} = 'yes'"
        },
        {
          elements: [
            {
              type: "radiogroup",
              choices: [
                {
                  value: "item1",
                  text: "a gain of 50"
                },
                {
                  value: "item2",
                  text: "a loss 50"
                },
                {
                  value: "item3",
                  text: "a gain of 200"
                },
                {
                  value: "item4",
                  text: "a loss of 200"
                },
                {
                  value: "item5",
                  text: "a gain of 10'000"
                },
                {
                  value: "response",
                  text: "a loss 10'000"
                }
              ],
              name: "question14",
              title: "If you have sold a E-mini S&P 500 Futures contract (contract multiplier 50) at 3100 and bought it back at 3300, what is your gain/loss ?"
            }
          ],
          name: "page13",
          visible: false,
          visibleIf: "{question2} = 'yes'"
        },
        {
          elements: [
            {
              type: "radiogroup",
              choices: [
                {
                  value: "item1",
                  text: "sell 2'000'000 SMI Future (swiss market index future)"
                },
                {
                  value: "item2",
                  text: "buy 2'000'000 SMI Future"
                },
                {
                  value: "item3",
                  text: "buy 1'600'000 SMI Future"
                },
                {
                  value: "response",
                  text: "sell 1'600'000 SMI Future"
                }
              ],
              name: "question15",
              title: "The beta of Nestle (swiss company) is 0.8. Assuming you have a position of CHF 2'000'000, which of the following gives a complete delta hedge ?"
            }
          ],
          name: "page14",
          visible: false,
          visibleIf: "{question2} = 'yes'"
        }
      ],
      showCompletedPage: false,
      showNavigationButtons: false
    };



    var surveyJSON = {};
    switch(this.$store.getters.active_survey.name) {
      case 'risks':
        surveyJSON = surveyJSONRisks;
        break;
      case 'derivatives':
        surveyJSON = surveyJSONDerivatives;
        break
      default:
      console.log("detect survey no idea about it, load risks")
      surveyJSON = surveyJSONRisks;
    }
    var model = new SurveyVue.Model(surveyJSON);

    model.onComplete.add(function(result) {
      //console.log(result);
      store.dispatch('SubmitSurvey', result.data).then(() => {
        //afficher message de results
      });
    });
    return {
      survey: model
    }
  },

  components: {
    Survey,
  },

}
</script>

<style>

</style>
