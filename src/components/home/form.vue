<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn
          dark
          hover
          fab
          large
          color="amber"
          id="create-button"
          slot="activator"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-card class="main-card-form">
        <v-alert
            color="error"
            icon="warning"
            :value="true"
            transition="scale-transition"
            v-for="error in errors"
        >
          {{ error.message }}
        </v-alert>
        <v-card-title>
          <div>
            <h3 class="headline mb-0">Add a new website</h3>
          </div>
        </v-card-title>
        <div class="fields">
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
                label="Name"
                v-model="name"
                required
            ></v-text-field>
            <v-text-field
                label="Website"
                v-model="website"
                required
            ></v-text-field>

            <v-text-field
                multi-line
                v-model="description"
                rows="5"
                label="Description"
                id="description-area"
                required
            ></v-text-field>
            <div class="input-section">
              <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
              <v-btn v-if="item.edit" @click="submit('PATCH', item)" color="amber" dark>Save</v-btn>
              <v-btn v-else @click="submit()" color="amber" dark>Save</v-btn>
            </div>
          </v-form>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import VTextField from "vuetify/es5/components/VTextField/VTextField";

  export default {
    components: {VTextField},
    data() {
      return {
        response: {},
        saved: false,
        formData: {},
        errors: null,
        valid: true,
      }
    },
    props: ['item', 'dialog'],
    computed: {
      name: {
        get() {
          if (this.item.name) {
            this.item.edit = true;
            this.formData.name = this.item.name;
            return this.item.name;
          }
          this.item.edit = false;
          return '';
        },
        set(value) {
          this.formData.name = value;
        },
      },
      website: {
        get() {
          if (this.item.url) {
            this.item.edit = true;
            this.formData.website = this.item.url;
            return this.item.url;
          }
          this.item.edit = false;
          return '';
        },
        set(value) {
          this.formData.website = value;
        },
      },
      description: {
        get() {
          if (this.item.description) {
            this.item.edit = true;
            this.formData.description = this.item.description;
            return this.item.description;
          }
          this.item.edit = false;
          return '';
        },
        set(value) {
          this.formData.description = value;
        },
      },
    },
    methods: {
      submit(method = 'POST', item = null) {

        if (!this.validate()) {
          return false;
        }

        let body = {
          name:        this.formData.name,
          url:         this.formData.website,
          description: this.formData.description,
        };

        body = JSON.stringify(body);

        let settings = {
          headers: {
            'Content-Type': 'application/json'
          },
          method: method,
          protocol: 'HTTP',
          body: body
        };

        let url = 'http://188.226.146.18/api/websites';

        if (method === 'PATCH') {
          url += ('/' + item._id);
        }

        const self = this;
        fetch(url, settings).then(response => response.json()).then(response => {
          self.response = response;
        });

        this.saved = true;
        this.$emit('get-state', this.formData.name);
        this.dialog = false;
        this.formData = {};
        this.$refs.form.reset();
        document.getElementById("description-area").value = "";
      },
      validate() {
        this.errors = [];

        if (!this.formData.name)        this.errors.push({ message: 'Name is required' });
        if (!this.formData.website)     this.errors.push({ message: 'Website is required' });
        if (!this.formData.description) this.errors.push({ message: 'Description is required' });

        if (this.errors.length > 0) { return false; }
        else { return true; }
      },
    },
  }
</script>

<style>

  .fields {
    padding: 16px;
  }

  #create-button {
    position: fixed;
    bottom: 50px;
    right: 50px;
  }

</style>
