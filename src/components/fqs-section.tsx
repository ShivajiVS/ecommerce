import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: 1,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards, net banking, UPI, and digital wallets like Paytm, PhonePe, and Google Pay.",
  },
  {
    id: 2,
    question: "How long does shipping take?",
    answer:
      "Shipping usually takes 3-7 business days depending on your location. Expedited shipping options are also available at checkout.",
  },
  {
    id: 3,
    question: "Can I return or exchange a product?",
    answer:
      "Yes, we have a hassle-free 7-day return and exchange policy. Please ensure the product is in its original condition with tags intact.",
  },
  {
    id: 4,
    question: "Do you offer international shipping?",
    answer:
      "Currently, we only ship within India. Stay tuned for updates on international shipping!",
  },
  {
    id: 5,
    question: "Do you offer warranties on your products?",
    answer:
      "Yes, all eligible products come with a manufacturer's warranty. Check the product description for details.",
  },
  {
    id: 6,
    question: "How do I track my order?",
    answer:
      "You can track your order by logging into your account and navigating to the 'My Orders' section.",
  },
  {
    id: 7,
    question: "Can I cancel my order after placing it?",
    answer:
      "Orders can be canceled within 24 hours of placement, provided they haven't been shipped.",
  },
] as const;

export const FAQSection = () => {
  return (
    <section>
      <h2 className="tracking-tight font-bold text-lg lg:text-2xl mt-20 mb-4 lg:mb-6 text-center">
        FAQs - Everything You Need to Know
      </h2>
      <Accordion type="single" collapsible>
        {faqs.map(({ id, question, answer }) => (
          <AccordionItem value={`item-${id}`} key={id}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
