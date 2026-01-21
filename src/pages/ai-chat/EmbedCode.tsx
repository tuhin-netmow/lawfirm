import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";

const EmbedCode = () => {
    const embedCode = `<script>
  window.consultantAI = {
    apiKey: "YOUR_PUBLIC_API_KEY",
    theme: "#2563eb"
  };
</script>
<script src="https://cdn.erp-consultant.com/widget.js" async></script>`;

    const handleCopy = () => {
        navigator.clipboard.writeText(embedCode);
        alert("Code copied to clipboard!");
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Installation & Embed</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Embed on your Website</CardTitle>
                    <CardDescription>
                        Copy and paste the following code snippet into the <code>&lt;head&gt;</code> or <code>&lt;body&gt;</code> of your website to enable the AI Assistant.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                        <pre className="p-4 overflow-x-auto text-sm text-gray-100 bg-gray-900 rounded-lg">
                            <code>{embedCode}</code>
                        </pre>
                        <Button
                            size="sm"
                            variant="secondary"
                            className="absolute top-2 right-2"
                            onClick={handleCopy}
                        >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Code
                        </Button>
                    </div>

                    <div className="mt-6">
                        <h3 className="mb-2 font-medium">Instruction:</h3>
                        <ul className="pl-5 space-y-1 list-disc text-muted-foreground">
                            <li>Place this code on every page where you want the widget to appear.</li>
                            <li>Ensure your domain is whitelisted in your General Settings.</li>
                            <li>The widget will automatically inherit your configuration settings.</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default EmbedCode;
