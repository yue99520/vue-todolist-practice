Vue.component('todo-list', {
    props: {
        todo: Array,
    },
    data: function () {
        return {
            current_on_edit: -1
        }
    },
    template:
        `<div class="">
           <create-todo-item :fun_create="on_create_click"></create-todo-item>
           <div class="list">
               <div class="item" v-for="(event, index) in todo" :key="index">
                    <todo-item v-if="is_editing(index)"
                       :index="index" 
                       :event="event" 
                       :fun_delete="on_delete_click"
                       :fun_edit="on_edit_click"/>
                    <edit-todo-item v-else
                       :index="index"
                       :event="event"
                       :fun_update="on_update_click"/>
               </div>
           </div>
        </div>`,
    methods: {
        on_create_click: function (created) {
            this.todo.push(created);
        },
        on_delete_click: function (id) {
            this.todo.splice(id, 1);
        },
        on_update_click: function (id, updated) {
            this.todo[id] = updated;
            this.current_on_edit = -1;
        },
        on_edit_click: function (id) {
            this.current_on_edit = id;
            this.$forceUpdate();
        },
        is_editing: function (index) {
            return this.current_on_edit !== index
        }
    }
})

Vue.component('todo-item', {
    created: function () {
    },
    props: {
        index: Number,
        event: Object,
        fun_delete: Function,
        fun_edit: Function
    },
    data: function () {
        return {
            title: '',
            description: ''
        }
    },
    template:
        '<div class="ui card">' +
        '   <div class="content">' +
        '       <p class="ui header">{{ event.title }}</p>' +
        '   </div>' +
        '   <div class="content">' +
        '       <div class="description">' +
        '           {{ event.description }}' +
        '       </div>' +
        '   </div>' +
        '   <div class="extra content">' +
        '       <div class="meta">' +
        '           <span class="date right floated">created at: {{ event.created_at.toDateString() }}</span>' +
        '       </div>' +
        '       <div class="ui right floated buttons">' +
        '           <route-link to=""' +
        '           <input class="ui blue button" type="button" v-on:click="fun_edit(index)" value="Update">' +
        '           <input class="ui red button" type="button" v-on:click="fun_delete(index)" value="Delete">' +
        '       </div>' +
        '   </div>' +
        '</div>'
})

Vue.component('create-todo-item', {
    props: {
        fun_create: Function
    },
    data: function () {
        return {
            title: '',
            description: ''
        }
    },
    template:
        '<div class="ui card">' +
        '   <div class="content">' +
        '       <h2>Create</h2>' +
        '   </div>' +
        '   <div class="content">' +
        '   <div class="ui form">' +
        '       <div class="field">' +
        '           <label>Title</label>' +
        '           <input type="text" v-model="title" placeholder="input">' +
        '       </div>' +
        '       <div class="field">' +
        '           <label>Description</label>' +
        '           <input type="text" v-model="description" placeholder="input">' +
        '       </div>' +
        '       <div class="field">' +
        '           <input class="ui right floated green button" type="button" v-on:click="submit" value="Create">' +
        '       </div>' +
        '   </div>' +
        '   </div>' +
        '</div>',
    methods: {
        submit: function () {
            if (this.title !== '') {
                let timestamp = new Date();
                let created = {
                    title: this.title,
                    description: this.description,
                    created_at: timestamp,
                    updated_at: timestamp
                };
                this.title = '';
                this.description = '';
                this.fun_create(created);
            }
        }
    }
})

Vue.component('edit-todo-item', {
    created: function () {
        this.title = this.event.title;
        this.description = this.event.description;
    },
    props: {
        index: Number,
        event: Object,
        fun_update: Function
    },
    data: function () {
        return {
            title: '',
            description: ''
        }
    },
    template:
        '<div class="ui card">' +
        '   <div class="content">' +
        '       <h2>Edit</h2>' +
        '   </div>' +
        '   <div class="content">' +
        '   <div class="ui form">' +
        '       <div class="field">' +
        '           <label>Title</label>' +
        '           <input type="text" v-model="title" >' +
        '       </div>' +
        '       <div class="field">' +
        '           <label>Description</label>' +
        '           <input type="text" v-model="description" >' +
        '       </div>' +
        '       <div class="field">' +
        '           <input class="ui right floated green button" type="button" v-on:click="submit" value="Update">' +
        '       </div>' +
        '   </div>' +
        '   </div>' +
        '</div>',
    methods: {
        submit: function () {
            if (this.title !== '' && this.description !== '') {
                let timestamp = new Date();

                this.event.title = this.title;
                this.event.description = this.description;
                this.event.updated_at = timestamp;

                this.title = '';
                this.description = '';
                this.fun_update(this.index, this.event);
            }
        }
    }
})

const obj_todo = new Vue({
    el: '#obj_todo',
    data: {
        todoList: [
            {
                title: 'aaaa',
                description: 'bbbb',
                updated_at: new Date(),
                created_at: new Date()
            }
        ]
    }
});