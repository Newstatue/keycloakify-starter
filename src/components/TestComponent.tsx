import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TestComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-lg">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-center text-gray-900">测试组件</h1>
          <p className="text-center text-gray-600">验证 Tailwind CSS + shadcn/ui 配置</p>
        </div>

        <div className="space-y-4">
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

          <div className="flex gap-2 pt-4">
            <Button className="flex-1">
              主要按钮
            </Button>
            <Button variant="outline" className="flex-1">
              次要按钮
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center pt-4">
          <Button variant="destructive" size="sm">
            危险按钮
          </Button>
          <Button variant="secondary" size="sm">
            次要小按钮
          </Button>
          <Button variant="ghost" size="sm">
            幽灵按钮
          </Button>
          <Button variant="link" size="sm">
            链接按钮
          </Button>
        </div>
      </div>
    </div>
  );
}