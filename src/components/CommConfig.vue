<template>
    <Popper :class="props.theme" style="margin-right: 2%">
        <i class="fas fa-cog"></i>
        <template #content>
            <div class="row">
                <div class="col" v-if="!live">
                    <button
                        type="button"
                        class="btn btn-success btn-sm"
                        @click="changeComm"
                    >Enable stream</button>
                </div>
                <div class="col" v-else>
                    <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="changeComm"
                    >Disable stream</button>
                </div>
            </div>
            <br />
            <div class="row" v-if="!live">
                <div class="row">
                    <div class="col">
                        <label class="form-label">Num tweets</label>
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" />
                    </div>
                </div>
                <div class="row form-switch options">
                    <div class="col">
                        <label class="form-label">Retweets</label>
                    </div>
                    <div class="col">
                        <input class="form-check-input" type="checkbox" />
                    </div>
                </div>
                <div class="row form-switch options">
                    <div class="col">
                        <label class="form-label">Replies</label>
                    </div>
                    <div class="col">
                        <input class="form-check-input" type="checkbox" />
                    </div>
                </div>
            </div>
            <div class="row" v-else>
                <div class="row">
                    <div class="col">
                        <label class="form-label">Interval (s)</label>
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" />
                    </div>
                </div>
            </div>
        </template>
    </Popper>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Popper from "vue3-popper";

export default defineComponent({
    components: {
        Popper,
    },
    props: {
        theme: String,
    },
    setup(props) {
        const live = ref<boolean>(false);
        function changeComm() {
            live.value = !live.value;
        }
        return { props, live, changeComm }
    }
});
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto");

p,
label {
    font-family: Roboto;
    font-size: 90%;
}

.btn {
    border-radius: 15px;
    text-align: center;
    font-size: 12px;
    line-height: 1.42857;
    font-family: Roboto;
}

.options {
    padding-top: 0.5rem;
}

.form-control {
    border-radius: 10px;
    width: 5rem;
    height: 1.2rem;
}

.form-switch .form-check-input {
    background-color: rgb(121, 121, 121);
}

:deep(.popper) {
    padding: 20px;
    border-radius: 10px;
    width: 16rem;
}

.bg-dark {
    --popper-theme-background-color: #292e33;
    --popper-theme-background-color-hover: #292e33;
    color: #fff;
}

.bg-light {
    --popper-theme-background-color: #b8b9bb;
    --popper-theme-background-color-hover: #b8b9bb;
    color: #000;
}
</style>