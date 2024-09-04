<template>
  <div class="min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
    <!-- Background with angled split -->
    <div class="absolute inset-0 z-0">
      <div class="h-full w-full bg-ultify-blue"></div>
      <div class="absolute top-0 left-0 h-full w-1/3 bg-ultify-dark-grey transform skew-x-[30deg] origin-top-left"></div>
    </div>

    <!-- Contact Form Section -->
    <div class="lg:w-2/3 p-8 lg:p-16 relative z-10 flex items-center justify-center">
      <Card class="w-full max-w-2xl bg-ultify-grey shadow-lg">
        <CardHeader>
          <CardTitle class="text-3xl font-bold text-black text-center">Book A Free Consultation Now</CardTitle>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="submitForm" class="space-y-4">
            <ScrollArea class="h-[400px] pr-4">
              <div class="space-y-4">
                <div class="space-y-2">
                  <Label for="url">URL/Business Name</Label>
                  <Input id="url" v-model="formData.url" placeholder="URL/Business Name (If applicable)" class="bg-white text-ultify-dark-grey placeholder-ultify-grey" />
                </div>
                <div class="space-y-2">
                  <Label for="name">Name</Label>
                  <Input id="name" v-model="formData.name" placeholder="Name" required class="bg-white text-ultify-dark-grey placeholder-ultify-grey" />
                </div>
                <div class="space-y-2">
                  <Label for="email">Email</Label>
                  <Input id="email" v-model="formData.email" type="email" placeholder="Email" required class="bg-white text-ultify-dark-grey placeholder-ultify-grey" />
                </div>
                <div class="space-y-2">
                  <Label for="phone">Phone</Label>
                  <Input id="phone" v-model="formData.phone" type="tel" placeholder="Phone" required class="bg-white text-ultify-dark-grey placeholder-ultify-grey" />
                </div>
                <div class="space-y-2">
                  <Label for="service">Service</Label>
                  <Select v-model="formData.service">
                    <SelectTrigger class="bg-white text-ultify-dark-grey">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="social-media">Social Media</SelectItem>
                      <SelectItem value="seo">SEO</SelectItem>
                      <SelectItem value="paid-media">Paid Media</SelectItem>
                      <SelectItem value="content-creation">Content Creation</SelectItem>
                      <SelectItem value="print-advertising">Print Advertising</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div class="space-y-2">
                  <Label for="message">Message</Label>
                  <Textarea id="message" v-model="formData.message" placeholder="Your message" class="bg-white text-ultify-dark-grey placeholder-ultify-grey" />
                </div>
                <div class="flex items-center space-x-2">
                  <Checkbox id="marketing" v-model="formData.marketing" />
                  <Label for="marketing">I agree to receive marketing materials</Label>
                </div>
              </div>
            </ScrollArea>
            <Button type="submit" class="w-full bg-black text-white hover:bg-ultify-dark-grey transition-colors duration-300">
              <span v-if="!isSubmitting">LEAD WITHOUT A SWEAT</span>
              <div v-else class="w-full flex justify-center items-center">
                <Progress :value="submitProgress" class="w-1/2" />
              </div>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>

    <!-- Contact Information Section -->
    <div class="lg:w-1/3 p-8 lg:p-16 relative z-10 flex items-center justify-center">
      <div class="max-w-lg">
        <h2 class="text-4xl font-bold mb-4 text-black">ULTIFY SOLUTIONS</h2>
        <p class="text-xl font-semibold mb-8 text-black">If you need results, you need Ultify.</p>
        
        <Collapsible>
          <CollapsibleTrigger class="bg-ultify-white text-black px-4 py-2 rounded-full mb-4">Contact Information</CollapsibleTrigger>
          <CollapsibleContent>
            <div class="mb-8">
              <p class="font-bold mb-2 text-black">Level 25, 50 Clarent St, Wynyard, Sydney, NSW, 2000</p>
            </div>
            
            <div class="mb-8 text-black">
              <p class="flex items-center mb-2">
                <PhoneIcon class="w-5 h-5 mr-2" />
                <span>1800 ULTIFY</span>
              </p>
              <p class="flex items-center">
                <EnvelopeIcon class="w-5 h-5 mr-2" />
                <span>admin@ultify.net</span>
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <div class="flex space-x-4">
          <a href="#" aria-label="Instagram" class="text-black hover:text-ultify-blue transition-colors duration-300">
            <InstagramIcon class="w-8 h-8" />
          </a>
          <a href="#" aria-label="LinkedIn" class="text-black hover:text-ultify-blue transition-colors duration-300">
            <LinkedinIcon class="w-8 h-8" />
          </a>
          <a href="#" aria-label="Facebook" class="text-black hover:text-ultify-blue transition-colors duration-300">
            <FacebookIcon class="w-8 h-8" />
          </a>
        </div>
      </div>
    </div>
  </div>

  <Toast />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from '@/components/ui/toast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Toast } from '@/components/ui/toast'
import { PhoneIcon, EnvelopeIcon } from '@heroicons/vue/24/solid'
import { InstagramIcon, LinkedinIcon, FacebookIcon } from 'lucide-vue-next'
import gsap from 'gsap'

const { toast } = useToast()

const formData = ref({
  url: '',
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
  marketing: false
})

const isSubmitting = ref(false)
const submitProgress = ref(0)

const submitForm = async () => {
  isSubmitting.value = true
  submitProgress.value = 0

  const progressInterval = setInterval(() => {
    submitProgress.value += 10
    if (submitProgress.value >= 100) {
      clearInterval(progressInterval)
    }
  }, 200)

  try {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    clearInterval(progressInterval)
    submitProgress.value = 100

    toast({
      title: 'Form submitted successfully!',
      description: 'We will get back to you soon.',
      duration: 5000,
    })
  } catch (error) {
    clearInterval(progressInterval)
    toast({
      title: 'Error submitting form',
      description: 'Please try again.',
      variant: 'destructive',
      action: {
        label: 'Try Again',
        onClick: () => submitForm(),
      },
    })
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  gsap.from('.card', { 
    opacity: 0, 
    y: 50, 
    duration: 1, 
    ease: 'power3.out'
  })

  gsap.from('.max-w-lg > *', { 
    opacity: 0, 
    x: 50, 
    duration: 1, 
    stagger: 0.2, 
    ease: 'power3.out'
  })
})
</script>

<style scoped>
.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.input, .select, .textarea {
  transition: border-color 0.3s ease;
}

.input:hover, .select:hover, .textarea:hover {
  border-color: var(--ultify-blue);
}

.button {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.button:hover {
  transform: translateY(-2px);
}

.social-icon {
  transition: transform 0.3s ease;
}

.social-icon:hover {
  transform: scale(1.1);
}
</style>