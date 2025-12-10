
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle, Shield } from "lucide-react";
import { Turnstile } from "./Turnstile";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    if (!turnstileToken) {
      toast({
        title: "Security check required",
        description: "Please complete the security verification.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          ...values,
          turnstileToken,
        },
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw error;
      }

      setIsSubmitted(true);
      form.reset();
      setTurnstileToken(null);
      toast({
        title: "Message sent successfully!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
    } catch (error: any) {
      console.error("Error sending contact form:", error);
      
      let errorMessage = "Please try again later or contact us directly.";
      
      // Handle specific error messages
      if (error.message?.includes("Security check failed")) {
        errorMessage = "Security verification failed. Please try again.";
      } else if (error.message?.includes("All fields are required")) {
        errorMessage = "Please fill in all required fields.";
      }
      
      toast({
        title: "Failed to send message",
        description: errorMessage,
        variant: "destructive",
      });
      
      // Reset Turnstile on error
      setTurnstileToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTurnstileVerify = (token: string) => {
    console.log("Turnstile verified:", token);
    setTurnstileToken(token);
  };

  const handleTurnstileError = () => {
    console.error("Turnstile error");
    setTurnstileToken(null);
    toast({
      title: "Security check failed",
      description: "Please refresh the page and try again.",
      variant: "destructive",
    });
  };

  const handleTurnstileExpire = () => {
    console.log("Turnstile expired");
    setTurnstileToken(null);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-portal-sage mx-auto mb-4" />
        <h3 className="text-2xl font-medium text-portal-dark mb-2 font-cinzel">
          Message Sent Successfully!
        </h3>
        <p className="text-gray-600 mb-6">
          Thank you for contacting us. We'll get back to you as soon as possible.
        </p>
        <Button
          onClick={() => setIsSubmitted(false)}
          variant="outline"
          className="border-portal-sage text-portal-sage hover:bg-portal-sage hover:text-white"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-medium text-portal-dark mb-6 font-cinzel">
        Send Us a Message
      </h2>
      <p className="text-gray-600 leading-relaxed mb-8">
        Fill out the form below and we'll get back to you as soon as possible.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-portal-dark font-medium">
                  Full Name *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    {...field}
                    className="border-gray-300 focus:border-portal-sage focus:ring-portal-sage"
                  />
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
                <FormLabel className="text-portal-dark font-medium">
                  Email Address *
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    {...field}
                    className="border-gray-300 focus:border-portal-sage focus:ring-portal-sage"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-portal-dark font-medium">
                  Message *
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your project or ask us a question..."
                    className="min-h-[120px] border-gray-300 focus:border-portal-sage focus:ring-portal-sage"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Security Verification */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-portal-dark font-medium">
              <Shield className="w-4 h-4" />
              <span>Security Verification *</span>
            </div>
            <div className="flex justify-center">
              <Turnstile
                onVerify={handleTurnstileVerify}
                onError={handleTurnstileError}
                onExpire={handleTurnstileExpire}
              />
            </div>
            {!turnstileToken && (
              <p className="text-sm text-gray-600">
                Please complete the security check above to continue.
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !turnstileToken}
            className="w-full bg-portal-sage hover:bg-portal-sage/90 text-white py-3 text-lg"
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-8 p-4 bg-portal-sage/5 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Privacy Notice:</strong> Your information will only be used to respond to your inquiry and will not be shared with third parties.
        </p>
      </div>
    </div>
  );
};
