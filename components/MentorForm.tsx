'use client'
import React from 'react'

import { z } from 'zod'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'

import { mentorVoices, practices } from '@/constants/index'
import { createMentor } from '@/lib/actions/mentor.actions'
import { redirect } from 'next/navigation'

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Mentor is required"
    }).max(50, {
        message: "Mentor must be less than 50 characters"
    }),
    focus: z.string().min(1, {
        message: "Focus is required"
    }).max(50, {
        message: "Focus must be less than 50 characters"
    }),
    practice: z.string().min(1, {
        message: "Practice is required"
    }).max(50, {
        message: "Practice must be less than 50 characters"
    }),
    voice: z.string().min(1, {
        message: "Voice is required"
    }).max(50, {
        message: "Voice must be less than 50 characters"
    }),
    duration: z.coerce.number().min(1, {
        message: "Duration is required"
    }).max(45, {
        message: "Duration must be less than 45 minutes"
    }),
    style: z.string().min(1, {
        message: "Voice URL is required"
    }).max(50, {
        message: "Voice URL must be less than 50 characters"
    }),
})

const MentorForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            focus: "",
            practice: "",
            voice: "",
            duration: 15,
            style: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const mentor = await createMentor(values);
        if (mentor?.id) {
            redirect(`/mentors/${mentor.id}`);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mentor Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='Enter Mentor Name' className='input' />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="practice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Practice</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                    <SelectTrigger className='input'>
                                        <SelectValue placeholder='Select Practice' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            practices.map((practice: string) => (
                                                <SelectItem key={practice} value={practice} className='capitalize'>
                                                    {practice}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="focus"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What are you struggling or want to work on?</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder='discipline, anxiety, burnout, etc.' className='input' />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Voice</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                    <SelectTrigger className='input'>
                                        <SelectValue placeholder='Select  ' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            Object.keys(mentorVoices).map((gender: string) => (
                                                <SelectItem key={gender} value={gender} className='capitalize'>
                                                    {gender}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Voice Style</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                    <SelectTrigger className='input'>
                                        <SelectValue placeholder='Select Style' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="formal">Formal</SelectItem>
                                        <SelectItem value="conversational">Conversational</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Duration</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='Enter Duration' className='input' />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type='submit' className='btn-primary w-full cursor-pointer'>Build Your Mentor</Button>
            </form>
        </Form>
    )
}

export default MentorForm