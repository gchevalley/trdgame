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
              type: "text",
              isRequired: true,
              name: "shares",
              title: "How many shares do you currently have in portfolio ?"
            }
          ],
          name: "page1"
        }
      ],
      showNavigationButtons: false
    };
    var surveyJSON = {};
    switch(this.$store.getters.active_survey.name) {
      case 'risks':
      surveyJSON = surveyJSONRisks;
      break;
      default:

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
