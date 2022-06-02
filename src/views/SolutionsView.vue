<template>
  <b-container>
    <header-item />
    <h1>Lösungen des Sybit XDay-Quiz</h1>

    <b-form-group
      label-for="filter-input"
    >
      <b-input-group>
        <b-form-input
          id="filter-input"
          v-model="filter"
          type="search"
          placeholder="Type to Search"
          size="lg"
        ></b-form-input>

        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>

    <b-table
      :items="solutions"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :filter="filter"
      :filter-included-fields="filterOn"
      sort-icon-left
      responsive="sm"
      striped
    >
      <template #cell(solution)="data">
        <b class="text-info">{{ data.item.solution }}</b>: {{ data.item.answer }}
      </template>
      <template #cell(level)="data">
        <b-badge v-if="data.item.level === 'easy'" variant="secondary">{{ data.item.level }}</b-badge>
        <b-badge v-if="data.item.level === 'medium'" variant="info">{{ data.item.level }}</b-badge>
        <b-badge v-if="data.item.level === 'difficult'" variant="primary">{{ data.item.level }}</b-badge>
      </template>
    </b-table>

  </b-container>
</template>

<script>
import HeaderItem from '../components/HeaderItem.vue'
import questionService from '../services/question.service'
export default {
  components: { HeaderItem },
  name: 'SolutionsView',
  data () {
    return {
      sortBy: 'Level',
      sortDesc: false,
      filter: null,
      filterOn: [],
      solutions: [],
      fields: [
        {
          key: 'question',
          label: 'Frage',
          sortable: true
        },
        {
          key: 'solution',
          label: 'Lösung',
          sortable: true
        },
        {
          key: 'level',
          label: 'Schwierigkeit',
          sortable: true
        }
      ]
    }
  },
  mounted () {
    questionService.getQuestions().then(list => {
      this.solutions = list
      this.solutions.forEach(element => {
        element.answer =
          element.answers.find(answer => answer.id === element.solution).answer
      })
    })
  }
}
</script>

<style>

</style>
