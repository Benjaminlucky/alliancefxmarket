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
import { testimony } from "../../data.js";

function Signup() {
  return (
    <div className="innerWrapper max-w-full flex justify-center bg-black text-white">
      <div className="innerContent flex flex-col md:flex-col lg:flex-row gap-20 w-4/5 py-20 ">
        <div className="left flex-2 items-start">
          <div className="leftContent">
            <div className="top py-10">
              <h2 className="font-extrabold text-3xl md:text-5xl lg:text-7xl pt-3">
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
        <div className="right flex-1 w-full  bg-white rounded-lg">
          <div className="rightContent p-5">
            <div className="top">
              <div className="rightTopContent">
                <h3 className="text-black font-extrabold text-xl md:text-4xl lg:text-5xl leading-normal">
                  See what Investors are saying about us!
                </h3>
              </div>
            </div>
            <div className="bottom">
              <div className="rightBottomContent mt-10">
                <div className="testimonials flex flex-col gap-5">
                  {testimony.map((testimony, index) => (
                    <div
                      key={index}
                      className="testimony relative overflow-hidden rounded-lg shadow-lg min-h-[200px]"
                    >
                      <div className="absolute inset-0 bg-secondary-light bg-opacity-50 backdrop-blur-sm"></div>
                      <div className="relative z-10 p-6 md:ml-10 md:mr-10 lg:ml-10 lg:mr-10">
                        <div className="top flex  justify-between items-start mb-4">
                          <div className="left flex  items-center">
                            <div className="testifier mr-4">
                              <img
                                className="w-16 h-16 rounded-full object-cover border-2 border-white"
                                src={testimony.image}
                                alt={testimony.name}
                              />
                            </div>
                            <div className="name">
                              <h3 className="font-bold text-lg text-primary">
                                {testimony.name}
                              </h3>
                              <h5 className="text-sm text-gray-600">
                                {testimony.Designation}
                              </h5>
                            </div>
                          </div>
                          <div className="right flex items-end text-xl text-primary">
                            {typeof testimony.icon === "function"
                              ? testimony.icon()
                              : testimony.icon}
                          </div>
                        </div>
                        <div className="bottom py-5">
                          <p className="text-gray-700 italic">
                            {testimony.testimony}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
