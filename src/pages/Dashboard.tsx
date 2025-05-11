
import React from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { users, orders } from '@/lib/mock-data';
import { toast } from 'sonner';

const Dashboard = () => {
  // Use the first user as the mock logged-in user
  const user = users[0];
  const userOrders = orders;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg" alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="orders">
          <TabsList className="grid w-full grid-cols-1 mb-8">
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="space-y-4">
            <h2 className="text-xl font-semibold">Your Orders</h2>
            
            {userOrders.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="mb-4 text-muted-foreground">You haven't placed any orders yet.</p>
                <Button>Start Shopping</Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {userOrders.map(order => (
                  <Card key={order.id} className="p-6">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">Order #{order.id}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Placed on {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right mt-2 md:mt-0">
                        <div className="font-medium">${order.total.toFixed(2)}</div>
                        <Button variant="link" className="h-auto p-0">View Details</Button>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {order.items.map(item => (
                        <div key={item.product.id} className="flex items-center gap-3">
                          <div className="h-16 w-16 bg-muted rounded overflow-hidden">
                            <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{item.product.name}</h4>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span>Qty: {item.quantity}</span>
                              <span className="mx-1">·</span>
                              <span>${(item.product.salePrice || item.product.price).toFixed(2)} each</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
