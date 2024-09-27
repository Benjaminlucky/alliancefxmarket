import React from "react";
import "./signup.css";
import { Checkbox, Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { HiPhone } from "react-icons/hi";
import { FaIdCardClip } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../../lib/utils.js";
import { Button } from "../../components/ui/CustomUIComponents";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../components/ui/CustomUIComponents";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/CustomUIComponents";

function Signup() {
  return (
    <div className="innerWrapper max-w-full flex justify-center bg-black text-white">
      <div className="innerContent w-4/5 py-20 ">
        <div className="left">
          <div className="leftContent">
            <div className="top py-10">
              <h2 className="font-extrabold text-7xl pt-3">
                Create an Account
              </h2>
              <p className="text-secondary-light text-3xl mt-3">
                To Start Investing...
              </p>
            </div>
            <div className="bottom w-full">
              <form action="" className="w-full">
                <div className="max-w-2xl mt-3 flex flex-col">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="email4"
                      value="Full Name"
                      className="text-white"
                    />
                  </div>
                  <TextInput
                    id="email4"
                    type="email"
                    icon={FaUserCircle}
                    placeholder="Elon Musk"
                    required
                    className="text-2xl font-bold"
                  />
                </div>
                <div className="max-w-2xl mt-5 flex flex-col">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="email4"
                      value="Username"
                      className="text-white"
                    />
                  </div>
                  <TextInput
                    id="email4"
                    type="email"
                    icon={FaIdCardClip}
                    placeholder="elonmus79"
                    required
                    className="text-2xl font-bold"
                  />
                </div>
                <div className="max-w-2xl mt-5 flex flex-col">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="email4"
                      value="Email"
                      className="text-white"
                    />
                  </div>
                  <TextInput
                    id="email4"
                    type="email"
                    icon={HiMail}
                    placeholder="elon@example.com"
                    required
                    className="text-2xl font-bold"
                  />
                </div>
                <div className="max-w-2xl mt-5 flex flex-col">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="email4"
                      value="Phone"
                      className="text-white"
                    />
                  </div>
                  <TextInput
                    id="email4"
                    type="email"
                    icon={HiPhone}
                    placeholder="+1 0678 9088 787"
                    required
                    className="text-2xl font-bold"
                  />
                </div>
                <div className="max-w-2xl mt-5 flex flex-col">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="email4"
                      value="Country"
                      className="text-white"
                    />
                  </div>
                  <TextInput
                    id="email4"
                    type="email"
                    icon={HiPhone}
                    placeholder="United States"
                    required
                    className="text-2xl font-bold"
                  />
                </div>
                <div className="max-w-2xl mt-5 flex flex-col">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="email4"
                      value="Password"
                      className="text-white"
                    />
                  </div>
                  <TextInput
                    id="email4"
                    type="email"
                    icon={RiLockPasswordFill}
                    placeholder="******"
                    required
                    className="text-2xl font-bold"
                  />
                </div>
                <div className="max-w-2xl mt-5 flex flex-col">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="email4"
                      value="Confirm Password"
                      className="text-white"
                    />
                  </div>
                  <TextInput
                    id="email4"
                    type="email"
                    icon={RiLockPasswordFill}
                    placeholder="******"
                    required
                    className="text-2xl font-bold"
                  />
                </div>
                <div
                  className="flex max-w-md flex-col gap-4 mt-10"
                  id="checkbox"
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="accept"
                      defaultChecked
                      className="text-primary-light"
                    />
                    <Label htmlFor="accept" className="flex text-gray-400">
                      I agree with the&nbsp;
                      <a
                        href="#"
                        className="text-primary-light hover:underline "
                      >
                        terms and conditions
                      </a>
                    </Label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}

export default Signup;
