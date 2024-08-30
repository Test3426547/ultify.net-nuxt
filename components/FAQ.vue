<template>
  <section class="faq-section">
    <div class="container">
      <h2 class="faq-title text-white">FAQ</h2>
      <p class="faq-subtitle text-white">
        If you have any questions that aren't addressed here, please feel free to contact our customer support team.
      </p>
      <div class="faq-grid">
        <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
          <div class="faq-question bg-primary text-white" @click="toggleAnswer(index)" @mouseover="startBounce(index)" @mouseleave="stopBounce(index)">
            <span>{{ faq.question }}</span>
            <span class="faq-icon">{{ faq.showAnswer ? '▲' : '▼' }}</span>
          </div>
          <div v-if="faq.showAnswer" class="faq-answer bg-primary text-white">
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['loaded'])

onMounted(() => {
  emit('loaded')
})

const faqs = ref([
  {
    question: 'What is digital marketing?',
    answer: "To ULTIFY, digital marketing is more than just following a simple-step solution. We truly stand where our mouth is and know that digital marketing is all about being able to reach targeted audiences through dominating digital resources; such as social media platforms, the online webspace and other digital marketing capabilities. Digital marketing is all about being able to build and integrate custom tailored systems that pioneer the transition from a average business to a successful business. Did you know that around 96.3% of Australians use the internet (per 2023)? It's a no brainer to take advantage of the wide audience digital marketing provided, alongside the countless opportunities at hand. Digital marketing should be in your best interest as reaching your desired audience has never been made easier, evident through a wide spectrum marketing techniques, one of the most common being SEO (Search Engine Optimisation). In a nutshell, the goal of SEO is to rank your business as high as possible in search engine results therefore maximising exposure to potential customers seeking your product/s or service.",
    showAnswer: false,
    isBouncing: false
  },
  {
    question: 'How do I get started?',
    answer: "It's as simple as contacting us. If you are serious on taking your business to the next level, then go ahead and fill out our consultation form, or give us a call/email and we will get back to you ASAP. We will audit your businesses digital infastucture and run you through improvements/strategies that can be made. If you like the sound of an elevated digital platform for your company, get in touch now!",
    showAnswer: false,
    isBouncing: false
  },
  {
    question: 'Why is ULTIFY the best digital marketing agency in Australia?',
    answer: "We aren't your typical digital marketing agency. Not listened too? No results? Promised so much but received so little? Nup, not us. Here at ULTIFY we guarantee results on a regular basis. With unmatched proficiency and professionalism, our digital marketing services are guaranteed to surpass your expectations. We avoid the bare minimum like it's the plague, so you can stop worrying about what we know will work so you can get back on track in the right direction. If you need someone to partner with in this every-changing digital realm, ULTIFY is the perfect match for your business as we align our visions with yours every step of the way. After years of learning the ins and outs, interning for topo agencies here, top agencies there, we have developed our own working system which allows us to provide you qualitative services that completely removes the commonly associated high pricing, run-arounds and b.s that is linked to digitl marketing. If you are looking for a team to collaborate with that won't just drive your sales, but a team that will develop all your business elements on a guaranteed basis, then stop scrolling and contact us immediately. Let's get working, now.",
    showAnswer: false,
    isBouncing: false
  },
  {
    question: 'What type of clients does ULTIFY work with?',
    answer: "At ULTIFY, our door are open to like-minded individuals that share same goal as us; elevating their business. Unlike other agencies who pick and choose, finding their most guaranteed profitable projects, we respect and value projects we find interesting. This resembles our believe in our work as we know we can take you to the next level, otherwise there will be no money in it for us if you don't grow. At ULTIFY, we are willing to take clients on all levels. Whether you are starting out fresh or is a mature brand in your respective indiustry, ULTIFY hpromises to provide you a strong digital marketing team for any service you may need.",
    showAnswer: false,
    isBouncing: false
  },
  {
    question: 'How do I find the right digital marketing agency for my company?',
    answer: "Do you need experts who relentlessly work on bettering you businesses ROI (Return on investment)? Do you need a digital marketing agency who aligns there visions with yours? An agency who doesn't try sell you on every one of their services even though you don't need them? Welcome to ULTIFY, we'd work well together. But if not, start by laying out the budget, goal and specifc services you are looking for Just know that a valuable digital marketing agency will pick you as much as you pick them, so if we think things won't work out, we won't waste your time.",
    showAnswer: false,
    isBouncing: false
  },
  {
    question: 'What can a digital marketing agency do for my business?',
    answer: "Do you need a team of certified professionals that are dedicated to constantly improveing your businesses selling points through digital means? Experts whom enhance your digital presence and convert? That's exactly what we do at ULTIFY, something we guarantee. A digital marketing agency utilises tools, experience and expertise to consistently integrate beneficial factors into your business. Seb cuts a consumer electronics retailer, was facing increased competition in the market. Their website was struggling to attract online visitors, and they were losing ground to e-commerce giants. Solution: XYZ Electronics partnered with our digital marketing agency to revamp their online presence. We conducted a comprehensive digital audit and devised a multi-faceted strategy which ultimately boosted their visibility and drove sales by 400 percent. At ULTIFY, we can guarantee results in all the services we provide; Website, Social Media, SEO, SEM, Content Creation, Graphic Design & Animation, Print Advertising",
    showAnswer: false,
    isBouncing: false
  },
  {
    question: 'What can I expect from a digital marketing agency team?',
    answer: "Through industry experience, we know that working with many agencies will make you feel like you are just a second thought, something you would never experience when you partner with us. When your working alongside ULTIFY, expect nothing but bliss. Making your life easier is our number one priority. Proffesionalism, seemless communication and gauranteed results are only a few of the valuable characteristics we uphold and exceed. Our tailored digital marketing strategies and commitment to your businesses success is definitely something you will look forward too.",
    showAnswer: false,
    isBouncing: false
  },
  {
    question: 'Which industries benefit most from digital marketing?',
    answer: "The world is a fast-paced rapidly changing dynamic that we all live in, with growing standards, improving strategies and new ideas that we try our best to stay updated about. Just like the world evolves, digital marketing is constructed of constantly changing algorithms and it is our agencies duty to stay one step ahead regarding such developments. Simply put, what worked last year does not work this year for numerous elements in digital marketing. While, key marketing factors never change, it is idiotic to think all marketing factorcs never change. Just in a one year span, google changes their SEO systems 500-600 times, alongside numerous key changes throughout the same 365. At our digital marketing agency, we promise to be more than just up-to-date, but one step ahead at all times as we utilise tactics that gain us future insights or developments before they are released to the general public.",
    showAnswer: false,
    isBouncing: false
  },
]);

const toggleAnswer = (index) => {
  faqs.value[index].showAnswer = !faqs.value[index].showAnswer;
};

const startBounce = (index) => {
  faqs.value[index].isBouncing = true;
};

const stopBounce = (index) => {
  faqs.value[index].isBouncing = false;
};
</script>

<style scoped>
.faq-section {
  background-color: #2B2A2A;
  padding: 100px 0; /* Retained 100px padding top and bottom */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.faq-title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 20px;
}

.faq-subtitle {
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 60px;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Changed back to 2 columns */
  gap: 30px;
}

.faq-item {
  margin-bottom: 20px;
}

.faq-question {
  padding: 15px 25px;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
  transition: transform 0.3s ease-in-out;
  min-height: 80px;
}

.faq-question span:first-child {
  flex: 1;
  display: flex;
  align-items: center;
  line-height: 1.3;
}

.faq-question:hover {
  transform: translateY(-5px);
}

.faq-question.isBouncing {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.faq-icon {
  font-size: 0.8rem;
  margin-left: 10px;
}

.faq-answer {
  padding: 20px;
  border-radius: 20px;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .faq-section {
    padding: 60px 0;
  }

  .faq-title {
    font-size: 2.5rem;
  }

  .faq-subtitle {
    font-size: 1rem;
    margin-bottom: 40px;
  }

  .faq-grid {
    grid-template-columns: 1fr; /* Single column for mobile */
  }

  .faq-question {
    padding: 12px 20px;
    min-height: 60px;
  }
}
</style>