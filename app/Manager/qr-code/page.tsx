import CreateForm from "@/components/Manager-Ui/QrCode-ui/CreateForm"
import EditForm from "@/components/Manager-Ui/QrCode-ui/EditForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { auth } from "@clerk/nextjs/server"

export default async function QRCODE() {
  const { userId } = await auth()
  console.log(userId)

  return <div className="w-full h-full">
    <Tabs defaultValue="create" className="w-full h-full">
      <TabsList>
        <TabsTrigger value="create">Create-QRCode</TabsTrigger>
        <TabsTrigger value="edit">Edit-QRCode</TabsTrigger>
      </TabsList>
      <TabsContent value="create" className="w-full" >
        <CreateForm />
      </TabsContent>
      <TabsContent value="edit" className=" flex w-full items-center justify-around" >
        <EditForm />
      </TabsContent>
    </Tabs>
  </div>
}
