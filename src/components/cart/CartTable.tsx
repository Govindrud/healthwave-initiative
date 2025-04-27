
import React from "react";
import { Button } from "@/components/ui/button";
import { TrashIcon, Plus, Minus } from "lucide-react";
import { useRegion } from "@/context/RegionContext";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "@/components/ui/Image";

interface CartTableProps {
  cart: Array<{
    product: {
      id: string;
      name: string;
      price: number;
      discountPrice?: number;
      image: string;
    };
    quantity: number;
  }>;
  onQuantityChange: (index: number, delta: number) => void;
  onRemove: (index: number) => void;
}

const CartTable = ({ cart, onQuantityChange, onRemove }: CartTableProps) => {
  const { formatPrice } = useRegion();
  const { t } = useTranslation();
  
  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('product')}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('price')}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('quantity')}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('total')}
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">{t('actions')}</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {cart.map((item, index) => {
            const price = item.product.discountPrice || item.product.price;
            const total = price * item.quantity;
            
            return (
              <tr key={item.product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{item.product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatPrice(price)}
                    {item.product.discountPrice && (
                      <span className="line-through text-gray-500 ml-2 text-xs">
                        {formatPrice(item.product.price)}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center border rounded-md w-fit">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 rounded-r-none"
                      onClick={() => onQuantityChange(index, -1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <div className="px-3 py-1 border-x text-center w-10">{item.quantity}</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 rounded-l-none"
                      onClick={() => onQuantityChange(index, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{formatPrice(total)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
