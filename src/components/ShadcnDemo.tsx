import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle } from "lucide-react";

export default function ShadcnDemo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">shadcn/ui 设计系统展示</h1>
          <p className="text-lg text-muted-foreground">验证 Tailwind CSS + shadcn/ui 配置是否正确</p>
        </div>

        {/* Alert Examples */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Alert 组件</h2>
          <div className="grid gap-4">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                这是一个成功消息的示例。shadcn/ui 的 Alert 组件工作正常！
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                这是一个错误消息的示例。使用了 destructive 变体。
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Card with Form */}
        <Card>
          <CardHeader>
            <CardTitle>用户登录</CardTitle>
            <CardDescription>
              使用 shadcn/ui 组件构建的登录表单
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱地址</Label>
              <Input
                id="email"
                type="email"
                placeholder="输入您的邮箱"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="输入您的密码"
                className="w-full"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="flex gap-2 w-full">
              <Button className="flex-1">
                登录
              </Button>
              <Button variant="outline" className="flex-1">
                取消
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 w-full">
              <Badge variant="secondary">Secondary Badge</Badge>
              <Badge variant="outline">Outline Badge</Badge>
              <Badge>Default Badge</Badge>
            </div>
          </CardFooter>
        </Card>

        {/* Button Variants */}
        <Card>
          <CardHeader>
            <CardTitle>按钮变体</CardTitle>
            <CardDescription>
              展示所有 shadcn/ui 按钮样式
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <Button variant="default" size="default">
                Default
              </Button>
              <Button variant="secondary" size="default">
                Secondary
              </Button>
              <Button variant="outline" size="default">
                Outline
              </Button>
              <Button variant="ghost" size="default">
                Ghost
              </Button>
              <Button variant="link" size="default">
                Link
              </Button>
              <Button variant="destructive" size="default">
                Destructive
              </Button>
            </div>

            <Separator />

            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🔥</Button>
            </div>
          </CardContent>
        </Card>

        {/* More Form Components */}
        <Card>
          <CardHeader>
            <CardTitle>更多表单组件</CardTitle>
            <CardDescription>
              展示 shadcn/ui 的各种表单控件
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Checkbox */}
            <div className="space-y-2">
              <Label>复选框组</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms1" />
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  接受条款和条件
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms2" defaultChecked />
                <label
                  htmlFor="terms2"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  订阅新闻通讯
                </label>
              </div>
            </div>

            {/* Radio Group */}
            <div className="space-y-2">
              <Label>单选按钮组</Label>
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">选项一</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">选项二</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-three" id="option-three" />
                  <Label htmlFor="option-three">选项三</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Switch */}
            <div className="flex items-center justify-between">
              <Label htmlFor="marketing">启用营销邮件</Label>
              <Switch id="marketing" />
            </div>

            {/* Select */}
            <div className="space-y-2">
              <Label htmlFor="select">选择框</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择一个选项" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">苹果</SelectItem>
                  <SelectItem value="banana">香蕉</SelectItem>
                  <SelectItem value="orange">橙子</SelectItem>
                  <SelectItem value="grape">葡萄</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Textarea */}
            <div className="space-y-2">
              <Label htmlFor="message">消息</Label>
              <Textarea
                placeholder="在这里输入您的消息..."
                id="message"
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Progress and Slider */}
        <Card>
          <CardHeader>
            <CardTitle>进度和滑块组件</CardTitle>
            <CardDescription>
              展示进度条和滑块控件
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>进度条</Label>
              <Progress value={75} className="w-full" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>滑块</Label>
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>标签页组件</CardTitle>
            <CardDescription>
              展示可切换的标签页内容
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">账户</TabsTrigger>
                <TabsTrigger value="password">密码</TabsTrigger>
                <TabsTrigger value="notifications">通知</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">姓名</Label>
                  <Input id="name" defaultValue="张三" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">用户名</Label>
                  <Input id="username" defaultValue="@zhangsan" />
                </div>
              </TabsContent>
              <TabsContent value="password" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current">当前密码</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">新密码</Label>
                  <Input id="new" type="password" />
                </div>
              </TabsContent>
              <TabsContent value="notifications" className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>邮件通知</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>推送通知</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>短信通知</Label>
                    <Switch />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Accordion */}
        <Card>
          <CardHeader>
            <CardTitle>手风琴组件</CardTitle>
            <CardDescription>
              可折叠的内容区域
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>什么是 shadcn/ui？</AccordionTrigger>
                <AccordionContent>
                  shadcn/ui 是一个基于 Radix UI 和 Tailwind CSS 构建的高质量、可复用的 React 组件库。它提供了设计系统的基础组件，可以直接复制到您的项目中使用。
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>如何使用这些组件？</AccordionTrigger>
                <AccordionContent>
                  这些组件已经配置好 CSS 变量和 Tailwind 样式。您可以直接导入并在您的项目中使用它们。所有的样式都通过 CSS 变量进行主题化，方便自定义。
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>支持哪些功能？</AccordionTrigger>
                <AccordionContent>
                  支持完整的主题系统、深色模式、响应式设计、无障碍访问，以及与各种表单库的集成。所有组件都基于现代 Web 标准构建。
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Color Test */}
        <Card>
          <CardHeader>
            <CardTitle>颜色系统测试</CardTitle>
            <CardDescription>
              验证 CSS 变量是否正确应用
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-primary text-primary-foreground p-4 rounded-md">
                <p className="font-medium">Primary</p>
                <p className="text-xs">主色调</p>
              </div>
              <div className="bg-secondary text-secondary-foreground p-4 rounded-md">
                <p className="font-medium">Secondary</p>
                <p className="text-xs">次要色调</p>
              </div>
              <div className="bg-muted text-muted-foreground p-4 rounded-md">
                <p className="font-medium">Muted</p>
                <p className="text-xs">静默色调</p>
              </div>
              <div className="bg-accent text-accent-foreground p-4 rounded-md">
                <p className="font-medium">Accent</p>
                <p className="text-xs">强调色调</p>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-destructive text-destructive-foreground p-4 rounded-md">
                <p className="font-medium">Destructive</p>
                <p className="text-xs">危险色调</p>
              </div>
              <div className="border-2 border-border p-4 rounded-md">
                <p className="font-medium">Border</p>
                <p className="text-xs">边框色</p>
              </div>
              <div className="bg-input text-foreground p-4 rounded-md">
                <p className="font-medium">Input</p>
                <p className="text-xs">输入框色</p>
              </div>
              <div className="bg-ring text-ring-foreground p-4 rounded-md">
                <p className="font-medium">Ring</p>
                <p className="text-xs">焦点环色</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}