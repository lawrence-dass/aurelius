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
import { FancyMultiSelect } from './custom-multi-select'
import { mentorVoices, practices, specialties, virtues } from '@/constants/index'
import { createMentor } from '@/lib/actions/mentor.actions'
import { redirect } from 'next/navigation'


const formSchema = z.object({
    name: z.string().min(1, {
        message: "Mentor is required"
    }).max(50, {
        message: "Mentor must be less than 50 characters"
    }),
    title: z.string().min(1, {
        message: "Title is required"
    }).max(50, {
        message: "Title must be less than 50 characters"
    }),
    famousQuote: z.string().min(1, {
        message: "Famous Quote is required"
    }).max(200, {
        message: "Famous Quote must be less than 200 characters"
    }),
        introduction: z.string().min(1, {
        message: "Introduction is required"
    }).max(1000, {
        message: "Introduction must be less than 1000 characters"
    }),
    primaryVirtue: z.string().min(1, {
        message: "Primary Virtue is required"
    }).max(50, {
        message: "Primary Virtue must be less than 50 characters"
    }),
    secondaryVirtues: z.array(z.string()).min(1, {
        message: "Secondary Virtues are required"
    }).max(50, {
        message: "Secondary Virtues must be less than 50 characters"
    }),
    practices: z.array(z.string()).min(1, {
        message: "Practice is required"
    }).max(50, {
        message: "Practice must be less than 50 characters"
    }),
    specialties: z.array(z.string()).min(1, {
        message: "Specialties are required"
    }).max(50, {
        message: "Specialties must be less than 50 characters"
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
            title: "",
            famousQuote: "",
            introduction: "",
            primaryVirtue: "",
            secondaryVirtues: [],
            practices: [],
            specialties: [],
            voice: "male",
            duration: 3,
            style: "classical",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {


        const newValues = {
            ...values,
            mentorType: "custom" as "custom" | "default"
        }
        
        const mentor = await createMentor(newValues);
        if (mentor?.id) {
            redirect(`/mentors/${mentor.id}`);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder='Enter Title' className='input' /> 
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="famousQuote"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Famous Quote</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder='Enter Famous Quote' className='input' />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                        name="introduction"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Introduction</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder='Enter Introduction' className='input' />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="primaryVirtue"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Primary Virtue</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                    <SelectTrigger className='input'>
                                        <SelectValue placeholder='Select Primary Virtue' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(virtues).map((virtue: string) => (
                                            <SelectItem key={virtue} value={virtue} className='capitalize'>
                                                {virtues[virtue as keyof typeof virtues] as string}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="secondaryVirtues"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Secondary Virtues</FormLabel>
                            <FormControl>
                                <FancyMultiSelect
                                        placeholder='Select Secondary Virtues'
                                        selected={field.value}
                                        setSelected={field.onChange}
                                        selectables={Object.keys(virtues).map((virtue: string) => ({
                                            label: virtues[virtue as keyof typeof virtues] as string,
                                            value: virtue
                                        }))}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="practices"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Practices</FormLabel>
                            <FormControl>
                                <FancyMultiSelect
                                    placeholder='Select Practices'
                                    selected={field.value}
                                    setSelected={field.onChange}
                                    selectables={Object.keys(practices).map((practice: string) => ({        
                                        label: practices[practice as keyof typeof practices] as string,
                                        value: practice
                                    }))}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="specialties"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Specialties</FormLabel>
                            <FormControl>
                                <FancyMultiSelect
                                    placeholder='Select Specialties'
                                    selected={field.value}
                                    setSelected={field.onChange}
                                    selectables={Object.keys(specialties).map((specialty: string) => ({
                                        label: specialties[specialty as keyof typeof specialties] as string,
                                        value: specialty
                                    }))}
                                />
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
                                        <SelectItem value="classical">Classical</SelectItem>
                                        <SelectItem value="modern">Modern</SelectItem>
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