'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormContainer,
  FormContent,
  FormFooter,
  FormHeader,
  FormInput,
  FormInputs,
  FormTitle
} from '@/components/form/FormPage'
import { signUp } from '@/requests/auth/signUp'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const emailValidation = z.string().email('E-mail inválido')
const formSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres')
})

type FormValues = z.infer<typeof formSchema>

export default function SignUpForm() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const router = useRouter()

  const inviteId = searchParams.get('inviteId')
  const email = searchParams.get('email')
  const { data } = emailValidation.safeParse(email)

  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: data ? data : '',
      password: ''
    },
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema)
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    const { email, name, password } = data

    const response = await signUp({
      email,
      name,
      password
    })

    if (response.error) {
      toast({
        title: 'Erro',
        description: response.error,
        variant: 'destructive'
      })
      return
    }

    router.push('/sign-in')
  })

  return (
    <FormContainer className="my-auto">
      <Form {...form}>
        <FormHeader>
          <FormTitle>Cadastre-se</FormTitle>
          <FormDescription>
            Crie sua conta para acessar a plataforma
          </FormDescription>
        </FormHeader>

        <form onSubmit={handleSubmit}>
          <FormContent>
            <FormInputs>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Nome</FormLabel>
                    <FormControl>
                      <Input id="name" placeholder="João da Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="mail@example.com"
                        {...field}
                        disabled={!!data}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Senha</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="4H8I2Y#5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormInputs>
            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </FormContent>
        </form>
      </Form>
      <FormFooter>
        Já tem uma conta?
        <Link href="/sign-in">
          <p className="text-b-400 font-medium text-black underline dark:text-white">
            Faça login aqui.
          </p>
        </Link>
      </FormFooter>
    </FormContainer>
  )
}
