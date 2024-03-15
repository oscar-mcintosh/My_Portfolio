<template>
    <div class="contact__container container grid section__border">
        <div class="contact__content">
            <h3 class="contact__title">
                <i class="ri-chat-3-line"></i>Talk to me
            </h3>
            <div class="contact__info">
                <!-- <div class="contact__data">
                    <span class="contact__data-title">Phone</span>
                    <span class="contact__data-info"></span>
                </div> -->
                <!-- <div class="contact__data">
                    <span class="contact__data-title">Email</span>
                    <span class="contact__data-info">oscarmcintosh1@gmail.com</span>

                </div> -->

            </div>
        </div>
        <div class="contact__content">
            <h3 class="contact__title">
                <i class="ri-send-plane-line"></i>If you have a project or need help, contact me.
            </h3>
            <form @submit.prevent="submitForm" class="contact__form" id="contact-form">
                <div class="contact__form-div">
                    <label class="contact__form-tag">Name</label>
                    <input v-model="name" type="text" name="name" required placeholder="Your name" class="contact__form-input" id="contact-name">
                </div>
                <div class="contact__form-div">
                    <label class="contact__form-tag">Email</label>
                    <input v-model="email" type="text" name="email" required placeholder="Your email" class="contact__form-input" id="contact-email">
                </div>
                <div class="contact__form-div contact__form-area">
                    <label class="contact__form-tag">Project</label>
                    <textarea v-model="message" name="message" placeholder="Your message" id="contact-project" class="contact__form-input"></textarea>
                </div>
                <input type="checkbox" name="botcheck" class="hidden" style="display: none;">
                <button type="submit" class="contact__button">
                    Submit <i class="ri-arrow-right-up-line"></i>
                </button>
                
            </form>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  access_key: "abacf9d1-a030-4f43-8512-f990b3ecc514",
  subject: "New Submission from Web3Forms",
  name: "",
  email: "",
  message: "",
});

const result = ref("");
const status = ref("");

const submitForm = async () => {
  result.value = "Please wait...";
  try {
    const response = await $fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: form.value,
    });

    console.log(response); // You can remove this line if you don't need it
    
    if(response) {
      result.value = response.message;
      status.value = response.status === 200 ? "success" : "error";
    } else {
      result.value = "No response received from the server.";
      status.value = "error";
    }
  } catch (error) {
    console.log(error); // Log for debugging, can be removed
    status.value = "error";
    result.value = "Something went wrong!";
  } finally {
    // Reset form after submission
    form.value.name = "";
    form.value.email = "";
    form.value.message = "";

    // Clear result and status after 5 seconds
    setTimeout(() => {
      result.value = "";
      status.value = "";
    }, 5000);
  }
};
</script>


<style lang="scss" scoped>

</style>