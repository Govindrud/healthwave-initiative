import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Github, Code, Terminal, Globe, Server, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CodeBlock = ({ code }: { code: string }) => {
  const { toast } = useToast();
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
      description: "Code has been copied to your clipboard",
    });
  };
  
  return (
    <div className="relative">
      <pre className="bg-card border rounded-lg p-4 overflow-x-auto">
        <code className="text-sm font-mono">{code}</code>
      </pre>
      <Button 
        variant="outline" 
        size="sm" 
        className="absolute top-2 right-2"
        onClick={copyToClipboard}
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
};

const HostingOption = ({ 
  title, 
  icon: Icon, 
  description, 
  steps,
  link,
}: { 
  title: string;
  icon: React.ElementType;
  description: string;
  steps: Array<{title: string; content: string | JSX.Element}>;
  link: {url: string; text: string};
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="text-primary h-5 w-5" />
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {steps.map((step, index) => (
          <div key={index}>
            <h3 className="text-lg font-medium mb-2">Step {index + 1}: {step.title}</h3>
            {typeof step.content === 'string' ? <p>{step.content}</p> : step.content}
          </div>
        ))}
        <Button asChild className="mt-4">
          <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
            {link.text}
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

const Hosting = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Hosting Your MeantToHelp Website</h1>
            <p className="text-muted-foreground mb-8">
              Follow these guides to deploy your MeantToHelp website to a variety of hosting platforms.
            </p>
            
            <Tabs defaultValue="netlify">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="netlify">Netlify</TabsTrigger>
                <TabsTrigger value="vercel">Vercel</TabsTrigger>
                <TabsTrigger value="github">GitHub Pages</TabsTrigger>
              </TabsList>
              
              <TabsContent value="netlify" className="space-y-8">
                <HostingOption
                  title="Deploy to Netlify"
                  icon={Globe}
                  description="Netlify offers continuous deployment with Git, a global CDN, and free HTTPS."
                  steps={[
                    {
                      title: "Build your project",
                      content: (
                        <CodeBlock code="npm run build" />
                      )
                    },
                    {
                      title: "Create a Netlify account",
                      content: "Go to Netlify and create an account if you don't already have one."
                    },
                    {
                      title: "Deploy your site",
                      content: "Drag and drop your 'dist' folder onto the Netlify dashboard, or connect your Git repository for continuous deployment."
                    },
                    {
                      title: "Configure redirects for React Router",
                      content: (
                        <div className="space-y-2">
                          <p>Create a file called <code>_redirects</code> in your public directory with the following content:</p>
                          <CodeBlock code="/* /index.html 200" />
                        </div>
                      )
                    }
                  ]}
                  link={{
                    url: "https://www.netlify.com/",
                    text: "Go to Netlify"
                  }}
                />
              </TabsContent>
              
              <TabsContent value="vercel" className="space-y-8">
                <HostingOption
                  title="Deploy to Vercel"
                  icon={Server}
                  description="Vercel is a platform for frontend frameworks and static sites, providing a seamless workflow."
                  steps={[
                    {
                      title: "Install Vercel CLI",
                      content: (
                        <CodeBlock code="npm i -g vercel" />
                      )
                    },
                    {
                      title: "Create a Vercel account",
                      content: "Sign up for a Vercel account if you don't already have one."
                    },
                    {
                      title: "Deploy your site",
                      content: (
                        <div className="space-y-2">
                          <p>Run the following command in your project directory:</p>
                          <CodeBlock code="vercel" />
                        </div>
                      )
                    },
                    {
                      title: "Configure your project",
                      content: "Follow the prompts to configure your project. For React apps, Vercel should automatically detect the correct settings."
                    }
                  ]}
                  link={{
                    url: "https://vercel.com/",
                    text: "Go to Vercel"
                  }}
                />
              </TabsContent>
              
              <TabsContent value="github" className="space-y-8">
                <HostingOption
                  title="Deploy to GitHub Pages"
                  icon={Github}
                  description="GitHub Pages is a static site hosting service that takes files straight from a repository on GitHub."
                  steps={[
                    {
                      title: "Install gh-pages package",
                      content: (
                        <CodeBlock code="npm install gh-pages --save-dev" />
                      )
                    },
                    {
                      title: "Update package.json",
                      content: (
                        <div className="space-y-2">
                          <p>Add the following to your package.json:</p>
                          <CodeBlock code={`"homepage": "https://yourusername.github.io/repo-name",
"scripts": {
  // other scripts
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}`} />
                        </div>
                      )
                    },
                    {
                      title: "Configure vite.config.js",
                      content: (
                        <div className="space-y-2">
                          <p>If your repo name is not at the root of your domain, update your vite.config.js:</p>
                          <CodeBlock code={`export default defineConfig({
  base: '/repo-name/',
  // other config
})`} />
                        </div>
                      )
                    },
                    {
                      title: "Deploy to GitHub Pages",
                      content: (
                        <CodeBlock code="npm run deploy" />
                      )
                    }
                  ]}
                  link={{
                    url: "https://pages.github.com/",
                    text: "Go to GitHub Pages"
                  }}
                />
              </TabsContent>
            </Tabs>
            
            <div className="mt-12 p-6 border rounded-lg bg-card">
              <h2 className="text-xl font-bold mb-4">Additional Resources</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Code className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                  <span>
                    <strong>Static Site Generation:</strong> Consider using Next.js or Gatsby for improved SEO and performance.
                  </span>
                </li>
                <li className="flex items-start">
                  <Terminal className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                  <span>
                    <strong>Custom Domains:</strong> All of these platforms support custom domains. Follow the platform-specific instructions to set one up.
                  </span>
                </li>
                <li className="flex items-start">
                  <Globe className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                  <span>
                    <strong>SSL Certificates:</strong> Netlify and Vercel provide free SSL certificates automatically. For GitHub Pages, you can use Cloudflare.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Hosting;
