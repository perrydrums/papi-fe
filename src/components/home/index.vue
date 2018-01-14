<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <form-component :item="editData" :dialog="dialog" @get-state="setState"></form-component>
      <v-card class="main-card" color="grey lighten-5">
        <v-alert
            color="success"
            icon="check_circle"
            :value="deleted"
            transition="scale-transition"
        >
          Deleted website with ID: {{ deleted }}
        </v-alert>
        <v-alert
            color="success"
            icon="check_circle"
            :value="saved"
            transition="scale-transition"
        >
          Saved website '{{ saved }}'.
          <em style="float: right">Refresh the page to make the changes take effect</em>
        </v-alert>
        <v-card-title primary-title style="margin-bottom: 30px">
          <div>
            <h3 class="headline mb-0">
              Projects
            </h3>
          </div>
        </v-card-title>
        <v-expansion-panel inset>
          <v-expansion-panel-content style="background-color: #fafafa;" v-for="item in body">
            <div slot="header">{{ item.name }}</div>
            <v-card style="border-top: 2px solid #ffc107">
              <v-card-text>
                <h4><a class="link-no-dec" v-bind:href="item.url">Website</a></h4>
                {{ item.url }}
                <v-dialog v-model="website[item._id]" max-width="1000" right>
                  <v-btn class="preview-button" slot="activator" icon><v-icon>search</v-icon></v-btn>
                  <v-card>
                    <v-card-title class="headline">Website live preview</v-card-title>
                    <div class="thumbnail-container">
                      <div class="thumbnail">
                        <iframe :src="item.url" frameborder="0"></iframe>
                      </div>
                    </div>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <a :href="item.url" class="visit-button" target="_blank"><v-btn color="amber darken-1" flat="flat">Visit</v-btn></a>
                      <v-btn color="amber darken-1" flat="flat" @click.native="website[item._id] = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <h4>Description</h4>
                {{ item.description }}
                <div class="input-section">
                  <v-btn @click="editForm(item)" icon v-bind:value="item._id"><v-icon>edit</v-icon></v-btn>
                  <v-btn v-on:click="deleteItem(item._id)" icon v-bind:value="item._id"><v-icon>delete</v-icon></v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import FormComponent from './form.vue'

  export default {
    data() {
      return {
        body: [],
        deleted: false,
        editData: {},
        dialog: false,
        saved: false,
        website: {},
      }
    },
    components: {
      FormComponent
    },
    created() {
      this.getItems();
//      setInterval(() => this.getItems(), 1000);
    },
    methods: {
      getItems(url = 'http://188.226.146.18/api/websites') {
        const headers = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        };
        const self = this;
        self.body = [];
        fetch(url, headers).then(response => response.json()).then(response => {
          response.items.forEach((item, index) => {
            self.body.push(item);
          });
        });
      },
      deleteItem(id) {
        const headers = {
          method: 'DELETE',
        };

        let url = 'http://188.226.146.18/api/websites/' + id;
        fetch(url, headers).then(response => response.json()).then(response => {
          // deleted
        });

        this.deleted = id;
        this.getItems();
        this.$forceUpdate();
      },
      editForm(item) {
        this.editData = item;
        this.dialog = true;
      },
      setState(saved) {
        console.log(saved);
        this.saved = saved;
      },
    },
  }
</script>

<style>

  .main-card {
    margin-top: -120px;
    margin-bottom: 50px;
    padding-bottom: 30px;
    background-color: darkgrey;
  }

  .input-section {
    text-align: right;
    margin-top: 40px;
  }

  .link-no-dec{
    text-decoration: none;
    color: #ff8f00;
  }

  .preview-button {
    float: right;
  }

  .thumbnail iframe {
    width: 1000px;
    height: 625px;
  }

  .thumbnail {
    position: relative;
    -ms-zoom: 1;
    -moz-transform-origin: 0 0;
    -o-transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
  }

  .thumbnail-container {
    width: calc(1000px);
    height: calc(625px);
    display: inline-block;
    overflow: hidden;
    position: relative;
  }

  .visit-button {
    text-decoration: none;
  }

</style>
