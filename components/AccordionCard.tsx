import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const items = [
  {
    value: "hours",
    trigger: "What are your delivery hours?",
    content:
      "We deliver daily from 11:00 AM to 1:00 AM across selected areas.",
  },
  {
    value: "custom",
    trigger: "Do you offer custom pizza toppings?",
    content:
      "Yes, you can customize toppings, crust, and cheese options before checkout.",
  },
  {
    value: "group",
    trigger: "Can I place a large group order?",
    content:
      "Absolutely. For group orders, place your order at least 2 hours in advance.",
  },
  {
    value: "payment",
    trigger: "Which payment methods are accepted?",
    content:
      "We currently accept cash on delivery, cards, and major mobile wallets.",
  },
  {
    value: "track",
    trigger: "How can I track my order status?",
    content:
      "You can monitor your order from the tracking page once your order is placed.",
  },
]

export function AccordionCard() {
  return (
    <Card className="w-full bg-yellow-100 max-w-3xl mx-auto shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-zinc-900 sm:text-3xl">Frequently Asked Questions</CardTitle>
        <CardDescription className="text-zinc-600">
          Find answers to common questions about ordering, delivery, and more.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion defaultValue={["hours"]}>
          {items.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger className="text-left font-semibold text-zinc-900">{item.trigger}</AccordionTrigger>
              <AccordionContent className="text-zinc-600">{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
