<template>
  <div>
    <h2>{{facts[idx].title}}</h2>
    <div :class="$style.fact" v-html="facts[idx].body"></div>
  </div>
</template>

<script>
  export default {
    name: 'welcome',
    data () {
      return {
        idx: 0,
        facts: [
          {
            title: 'Your credit card does not really have an expiration date.',
            body: '<p :class="$style.fact">Yes, I know it says so on your card, but you could continue using it after the expiration date. Ever notice how the number on your replacement card is the same? The expiration date on your card fills two main purposes. First, it is an estimate of the lifetime of your credit card and gives your credit card issuer a date to send you a new card. Second, it is used for online and over-the-phone purchases when the merchant cannot see your card. Asking for the expiration date allows the merchant to confirm you are the owner of the card and have it in your possession.</p>'
          },
          {
            title: 'There are enough credit cards in circulation to span the earth over 3.5 times.',
            body: '<p class="fact">According to the financial reports of the three largest credit card companies in the world, there were over 1,635 million cards in circulation in 2013: Visa had 800 million, MasterCard had 731 million, and American Express had 104 million. If you placed all those cards side by side, you could span 86,981 miles: the equivalent of three and a half trips around the world.</p:>'
          },
          {
            title: 'The average US household credit card debt in 2013 was $15,191.',
            body: `<p>Sadly, many indebted households can only afford to make minimum payments on their credit card balance. Assuming a credit card interest rate of 15.24% (average for 2013) and a minimum payment of 2%, the average household would take over 30 years to pay its debt. By the time the balance is paid off, the total amount paid — including interest — will be $39,756.
                   <p>Ok, that last fact wasn’t that surprising, but it it should be shocking that American households are spending that kind of dough on high-interest loans. The sad thing is that many of the costs associated with credit cards are avoidable when you understand how credit cards work. According to a study by University of Nebraska researchers, Sall Allgood and William Walstad, low financial literacy is an excellent predictor of whether consumers engage in costly credit card use practices, such as not paying a credit card balance in full, only making minimum payments, and exceeding an account’s credit limit.</p>
                   <p>Ok, that wasn’t surprising either. What was surprising from Allgood and Walstad’s research is that perceived financial literacy, the level of financial literacy we think we have, was an even better predictor of credit card usage practices than actual financial literacy. In other words, people who thought they had a high level of financial literacy — but didn’t — were better at using their credit cards than those who had the same low-level of financial literacy and knew it. I’m not sure what that means, but it sure is surprising.</p>`
          }
        ]
      }
    },
    created () {
      console.log('CREATED!!!')
      console.log(this.$style.fact)
    },

    methods: {
      getFact () {
        this.idx = Math.floor(Math.random() * 3)
      }
    },

    beforeMount () {
      this.getFact()
    }
  }
</script>

<style module>
 .fact {
   margin-left: 150px;
   margin-right: 150px;
 }
</style>

