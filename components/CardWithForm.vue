<template>
    <Card class="w-full max-w-[500px]">
      <CardHeader>
        <CardTitle>Book A Free Consultation Now</CardTitle>
        <CardDescription>Fill out the form below and we'll get back to you shortly.</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleSubmit">
          <div class="grid w-full items-center gap-6">
            <div class="flex flex-col space-y-2">
              <Label htmlFor="business">URL/Business Name (if applicable)</Label>
              <Input id="business" placeholder="Enter your business name or URL" />
            </div>
            <div class="flex flex-col space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your full name" />
            </div>
            <div class="flex flex-col space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email address" />
            </div>
            <div class="flex flex-col space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="Enter your phone number" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button class="w-full">LEAD WITHOUT A SWEAT</Button>
      </CardFooter>
      <div class="text-center text-sm text-ultify-dark-grey/70 px-8 pb-8">
        You are booking a free consultation with no maximum time (TnC's apply). We will call you on the given number on our first available time-slot.
      </div>
    </Card>
  </template>
  
  <script setup lang="ts">
  import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card'
  import { Button } from '../components/ui/button'
  import { Input } from '../components/ui/input'
  import { Label } from '../components/ui/label'
  
  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted')
  }
  </script>
  
  <style scoped>
  .card {
    background-color: var(--ultify-grey);
  }
  
  .card-title {
    color: var(--ultify-blue);
    font-size: 2rem;
    line-height: 1.2;
    margin-bottom: 0.5rem;
  }
  
  .card-description {
    color: var(--ultify-dark-grey);
    opacity: 0.8;
  }
  
  .button {
    background-color: var(--ultify-blue);
    color: white;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  .input {
    border-color: var(--ultify-grey);
  }
  
  .input:focus {
    border-color: var(--ultify-blue);
  }
  
  .label {
    color: var(--ultify-dark-grey);
    font-weight: 600;
  }
  </style>